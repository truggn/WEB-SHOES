 import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/user'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .build()
