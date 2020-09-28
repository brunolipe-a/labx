import { addMinutes, isFuture } from 'date-fns'
import { DateTime } from 'luxon'
import { generate } from 'rand-token'

import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AppException from 'App/Exceptions/AppException'
import User from 'App/Models/User'
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
        token: await Hash.make(num),
        expiresAt: DateTime.fromJSDate(addMinutes(new Date(), 30))
      }
    )

    Mail.send(message => {
      message
        .from(Env.get('MAIL_FROM') as string)
        .to(email, user.name)
        .subject('Labx - Recuperação de email')
        .htmlView('emails/forgotpassword', {
          user,
          token: num
        })
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
      throw new AppException('Token expirado')
    }

    user.password = new_password
    await user.save()

    await tokenInstance.delete()

    return response.status(204)
  }
}
