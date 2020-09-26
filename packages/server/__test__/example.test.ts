import test from 'japa'
import supertest from 'supertest'

const request = supertest(`http://${process.env.HOST}:${process.env.PORT}`)

test.group('Example', () => {
  test('assert sum', assert => {
    assert.equal(2 + 2, 4)
  })

  test('ensure user password gets hashed during save', async assert => {
    const { body } = await request.get('/').expect(200)

    const { user } = body

    assert.equal(user.email, 'johndoe@example.com')
  })
})
