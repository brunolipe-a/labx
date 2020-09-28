import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import GenerateExpiresAtService from 'App/Service/GenerateExpiresAtService'
import SendMailService from 'App/Service/SendMailService'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const { email, password, username, name } = await request.validate(
      StoreValidator
    )

    const user = await User.create({ email, password, username, name })

    const { token } = await user.related('tokens').create({
      name: 'Activate User',
      type: 'activateuser',
      expiresAt: GenerateExpiresAtService.generate()
    })

    SendMailService.send({
      email,
      name,
      html: 'emails/activate',
      subject: 'Ativar usuário',
      data: {
        name,
        url: `${Env.get('FRONT_URL')}/verify?token=${token}`
      }
    })

    return { message: 'User created with success' }
  }
}
