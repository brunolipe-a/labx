import { UserFactory } from 'Database/factories/UserFactory'
import { addMinutes, differenceInMinutes } from 'date-fns'
import test from 'japa'
import supertest from 'supertest'
import { validate } from 'uuid'

import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

import Token from 'App/Models/Token'
import User from 'App/Models/User'

const request = supertest(process.env.APP_URL)

const ACTIVATE_TOKEN_EXPIRES_IN = 30

test.group('User', group => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should be able to create and send email to activate', async assert => {
    const payload = {
      email: 'johndoe@example.com',
      name: 'John Doe',
      username: 'asdasdasd',
      password: '123456',
      password_confirmation: '123456'
    }

    Mail.trap(message => {
      assert.deepEqual(message.to, [
        { address: payload.email, name: payload.name }
      ])
    })

    const { body } = await request.post('/users').send(payload).expect(200)

    assert.exists(body.message)
    assert.notExists(body.errors)

    const user = await User.query()
      .preload('tokens', query => {
        query.where('type', 'activateuser')
      })
      .where('email', payload.email)
      .firstOrFail()

    const token = user?.tokens[0]

    const diff = differenceInMinutes(
      addMinutes(new Date(), ACTIVATE_TOKEN_EXPIRES_IN),
      token.expiresAt.toJSDate()
    )

    assert.deepInclude(token.toJSON(), { type: 'activateuser' })
    assert.isTrue(validate(token.token))
    assert.strictEqual(diff, 0)

    Mail.restore()
  })

  test('it should not be able to create with invalid payload', async assert => {
    const payload = {
      email: 'johndoe',
      name: 'John Doe',
      username: 'asdasdasd!',
      password: '123456',
      password_confirmation: 'asdasd'
    }

    const { body } = await request.post('/users').send(payload).expect(422)

    assert.exists(body.errors)
  })

  test('it should not be able to create duplicated user', async assert => {
    const { email, username } = await UserFactory.merge({
      username: 'johndoe-me'
    }).create()

    const payload = {
      email,
      username,
      password: '123456',
      password_confirmation: '123456'
    }

    const { body } = await request.post('/users').send(payload).expect(422)

    assert.exists(body.errors)
  })

  test('it should be able to activate user', async assert => {
    const user = await UserFactory.with('tokens', 1, token =>
      token.apply('activateuser')
    ).create()

    const { token } = user.tokens[0]

    await request.post('/verify').send({ token }).expect(204)

    const updatedUser = await user.refresh()

    const updatedToken = await Token.find(user.tokens[0].id)

    assert.isNull(updatedToken)
    assert.isTrue(updatedUser.isActive)
  })

  test('it should not be able to activate user when expired token', async assert => {
    const user = await UserFactory.with('tokens', 1, token =>
      token.apply('activateuser', 'expireNow')
    ).create()

    const { token } = user.tokens[0]

    const { body } = await request.post('/verify').send({ token }).expect(401)

    const updatedUser = await user.refresh()

    const updatedToken = await Token.find(user.tokens[0].id)

    assert.exists(body.errors)
    assert.isNull(updatedToken)
    assert.isFalse(updatedUser.isActive)
  })

  test('it should not be able to activate user when invalid token', async assert => {
    const user = await UserFactory.with('tokens', 1, token =>
      token.apply('activateuser')
    ).create()

    const { body } = await request
      .post('/verify')
      .send({ token: 'invalid-token' })
      .expect(400)

    const updatedUser = await user.refresh()

    assert.exists(body.errors)
    assert.isFalse(updatedUser.isActive)
  })
})
