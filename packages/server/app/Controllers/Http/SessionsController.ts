import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class SessionsController {
  public async store({ request, auth }: HttpContextContract) {
    const { username, password } = request.only(['username', 'password'])

    const { token } = await auth
      .use('api')
      .attempt(username, password, { expiresIn: '10 days' })

    const user = await User.query()
      .where('username', username)
      .orWhere('email', username)
      .first()

    return {
      token,
      user: {
        id: user?.id,
        email: user?.email,
        username: user?.username,
        name: user?.name
      }
    }
  }
}
