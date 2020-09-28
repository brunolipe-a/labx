import { addMinutes } from 'date-fns'
import { DateTime } from 'luxon'

import Hash from '@ioc:Adonis/Core/Hash'
import Factory from '@ioc:Adonis/Lucid/Factory'

import Token from 'App/Models/Token'

export const TokenFactory = Factory.define(Token, ({ faker }) => {
  return {
    name: 'Opaque Access Token',
    type: 'opaque_token',
    token: faker.random.uuid(),
    expiresAt: DateTime.fromJSDate(addMinutes(new Date(), 30))
  }
})
  .state('forgotpassword', async post => {
    post.name = 'Forgot Password'
    post.type = 'forgotpassword'
    post.token = await Hash.make(post.token)
  })
  .state('expireNow', post => {
    post.expiresAt = DateTime.fromJSDate(new Date())
  })
  .build()
