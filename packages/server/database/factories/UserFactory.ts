import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'

import { TokenFactory } from './TokenFactory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.findName(),
    username: faker.internet.domainName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
  .relation('tokens', () => TokenFactory)
  .build()
