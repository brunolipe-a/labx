/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    }

    if (error.code === 'E_INVALID_AUTH_UID') {
      return ctx.response.status(401).send({
        errors: [{ message: 'Usuário/Email invalído', field: 'username' }]
      })
    }

    if (error.code === 'E_INVALID_AUTH_PASSWORD') {
      return ctx.response
        .status(401)
        .send({ errors: [{ message: 'Senha invalída', field: 'password' }] })
    }

    return super.handle(error, ctx)
  }
}
