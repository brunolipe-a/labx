import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const { email, password, username, name } = await request.validate(
      StoreValidator
    )

    await User.create({ email, password, username, name })

    return { message: 'User created with success' }
  }
}
