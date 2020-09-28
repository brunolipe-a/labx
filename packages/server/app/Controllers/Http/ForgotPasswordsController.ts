import { isFuture } from 'date-fns'
import { generate } from 'rand-token'

import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AppException from 'App/Exceptions/AppException'
import User from 'App/Models/User'
import GenerateExpiresAtService from 'App/Service/GenerateExpiresAtService'
import SendMailService from 'App/Service/SendMailService'
import StoreValidator from 'App/Validators/ForgetPassword/StoreValidator'
import UpdateValidator from 'App/Validators/ForgetPassword/UpdateValidator'

export default class ForgotPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    const { email } = await request.validate(StoreValidator)

    const user = await User.findByOrFail('email', email)

    const num = generate(6, '0123456789')

    await user.related('tokens').updateOrCreate(
      { type: 'forgotpassword' },
      {
        type: 'forgotpassword',
        name: 'Forgot Password',
        token: num,
        expiresAt: GenerateExpiresAtService.generate()
      }
    )

    SendMailService.send({
      email,
      name: user.name,
      html: 'emails/forgotpassword',
      subject: 'Recuperação de email',
      data: {
        user,
        token: num
      }
    })

    return response.status(204)
  }

  public async update({ request, response }: HttpContextContract) {
    const { email, new_password, token_num } = await request.validate(
      UpdateValidator
    )

    const user = await User.query()
      .preload('tokens', query => {
        query.where('type', 'forgotpassword')
      })
      .where('email', email)
      .firstOrFail()

    const tokenInstance = user.tokens[0]

    const { token, expiresAt } = tokenInstance

    const isValidToken = await Hash.verify(token, token_num)

    if (!isValidToken) {
      throw new AppException('Token inválido')
    }

    if (!expiresAt || !isFuture(expiresAt.toJSDate())) {
      await tokenInstance.delete()
      throw new AppException('Token expirado', 401)
    }

    user.password = new_password
    await user.save()

    await tokenInstance.delete()

    return response.status(204)
  }
}
