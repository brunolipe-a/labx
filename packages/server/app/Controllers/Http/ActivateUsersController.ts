import { isFuture } from 'date-fns'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AppException from 'App/Exceptions/AppException'
import Token from 'App/Models/Token'

export default class ActivateUsersController {
  public async update({ request, response }: HttpContextContract) {
    const token = request.input('token')

    const tokenFromUser = await Token.query()
      .preload('user', query => {
        query.where('is_active', false)
      })
      .where('token', token)
      .where('type', 'activateuser')
      .first()

    if (!tokenFromUser) {
      throw new AppException('Token inválido')
    }

    const { expiresAt } = tokenFromUser

    if (!expiresAt || !isFuture(expiresAt.toJSDate())) {
      await tokenFromUser.delete()
      throw new AppException('Token expirado', 401)
    }

    const { user } = tokenFromUser

    user.isActive = true
    await user.save()

    await tokenFromUser.delete()

    return response.status(204)
  }
}
