import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = await User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.create({ email, password })

    return user
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.only(['id'])

    const user = await User.find(id)

    return user
  }

  public async update({ request, response }: HttpContextContract) {
    const { id, email, password } = request.only(['id', 'email', 'password'])

    const user = await User.find(id)

    if (!user) {
      return response.status(400).json({ message: 'User not found' })
    }

    user.email = email ?? user?.email
    user.password = password ?? user?.password

    await user.save()

    return user
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])

    const user = await User.find(id)

    if (!user) {
      return response.status(400).json({ message: 'User not found' })
    }

    await user.delete()

    return response.json({ message: 'User deleted with success' })
  }
}
