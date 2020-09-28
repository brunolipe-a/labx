import { UserFactory } from 'Database/factories/UserFactory'
import test from 'japa'
import supertest from 'supertest'

import Database from '@ioc:Adonis/Lucid/Database'

const request = supertest(process.env.APP_URL)

test.group('Session', group => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should be able return access token when created', async assert => {
    const password = '123456'

    const { email, username, name } = await UserFactory.merge({
      password
    }).create()

    const res = await request
      .post('/sessions')
      .send({ username, password })
      .expect(200)

    assert.exists(res.body.token)
    assert.deepInclude(res.body.user, {
      email,
      username,
      name
    })
  })

  test('it should be able return access token when created with email', async assert => {
    const password = '123456'

    const { email, username, name } = await UserFactory.merge({
      password
    }).create()

    const { body } = await request
      .post('/sessions')
      .send({ username: email, password })
      .expect(200)

    assert.exists(body.token)
    assert.deepInclude(body.user, {
      email,
      username,
      name
    })
  })

  test('it should be able return error if invalid username', async assert => {
    const password = '123456'

    await UserFactory.merge({
      password
    }).create()

    const { body } = await request
      .post('/sessions')
      .send({ username: 'invalid-username', password })
      .expect(401)

    assert.exists(body.errors)
    assert.containsAllKeys(body.errors[0], ['message'])
    assert.isString(body.errors[0].message)
  })

  test('it should be able return error if invalid password', async assert => {
    const { username } = await UserFactory.create()

    const { body } = await request
      .post('/sessions')
      .send({ username, password: 'invalid-password' })
      .expect(401)

    assert.exists(body.errors)
    assert.containsAllKeys(body.errors[0], ['message'])
    assert.isString(body.errors[0].message)
  })
})
