import { UserFactory } from 'Database/factories/UserFactory'
import { addMinutes, differenceInMinutes } from 'date-fns'
import test from 'japa'
import supertest from 'supertest'

import Mail from '@ioc:Adonis/Addons/Mail'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

import Token from 'App/Models/Token'
import User from 'App/Models/User'

const request = supertest(process.env.APP_URL)

const FORGOT_TOKEN_EXPIRES_IN = 30

test.group('Forgot Password', group => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should send an email with reset password token that expires in "x" minutes', async assert => {
    const { email, name } = await UserFactory.create()

    Mail.trap(message => {
      assert.deepEqual(message.to, [{ address: email, name }])
    })

    await request.post('/reset-password').send({ email }).expect(204)

    const user = await User.query()
      .preload('tokens', query => {
        query.where('type', 'forgotpassword')
      })
      .where('email', email)
      .firstOrFail()

    const token = user?.tokens[0]

    const diff = differenceInMinutes(
      addMinutes(new Date(), FORGOT_TOKEN_EXPIRES_IN),
      token.expiresAt.toJSDate()
    )

    assert.deepInclude(token.toJSON(), { type: 'forgotpassword' })
    assert.strictEqual(diff, 0)

    Mail.restore()
  })

  test('it should change password on request', async assert => {
    const { new_password, new_password_confirmation, token_num } = {
      token_num: '123456',
      new_password: 'new-password',
      new_password_confirmation: 'new-password'
    }

    const user = await UserFactory.with('tokens', 1, token =>
      token.merge({ token: token_num }).apply('forgotpassword')
    ).create()

    await request
      .post('/change-password')
      .send({
        email: user.email,
        new_password,
        new_password_confirmation,
        token_num
      })
      .expect(204)

    const updatedUser = await user.refresh()

    const token = await Token.find(user.tokens[0].id)

    assert.isNull(token)
    assert.isTrue(await Hash.verify(updatedUser.password, new_password))
  })

  test('it should not change password on invalid token', async assert => {
    const { new_password, new_password_confirmation, token_num } = {
      token_num: '123456',
      new_password: 'new-password',
      new_password_confirmation: 'new-password'
    }

    const user = await UserFactory.with('tokens', 1, token =>
      token.merge({ token: token_num }).apply('forgotpassword')
    ).create()

    const { body } = await request
      .post('/change-password')
      .send({
        email: user.email,
        new_password,
        new_password_confirmation,
        token_num: '987654'
      })
      .expect(400)

    assert.exists(body.errors)
  })

  test('it should not change password on expired token', async assert => {
    const { new_password, new_password_confirmation, token_num } = {
      token_num: '123456',
      new_password: 'new-password',
      new_password_confirmation: 'new-password'
    }

    const user = await UserFactory.with('tokens', 1, token =>
      token.merge({ token: token_num }).apply('expireNow', 'forgotpassword')
    ).create()

    const { body } = await request
      .post('/change-password')
      .send({
        email: user.email,
        new_password,
        new_password_confirmation,
        token_num
      })
      .expect(401)

    const token = await Token.find(user.tokens[0].id)

    assert.isNull(token)
    assert.exists(body.errors)
  })
})
