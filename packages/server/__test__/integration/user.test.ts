import { UserFactory } from 'Database/factories/UserFactory'
import test from 'japa'
import supertest from 'supertest'

import Database from '@ioc:Adonis/Lucid/Database'

const request = supertest(process.env.APP_URL)

test.group('User', group => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should be able to create', async assert => {
    const payload = {
      email: 'johndoe@example.com',
      name: 'John Doe',
      username: 'asdasdasd',
      password: '123456',
      password_confirmation: '123456'
    }

    const { body } = await request.post('/users').send(payload).expect(200)

    assert.exists(body.message)
    assert.notExists(body.errors)
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
})
