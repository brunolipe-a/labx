import { Exception } from '@poppinss/utils'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new AppException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AppException extends Exception {
  constructor(message: string, status = 400, code?: string) {
    super(message, status, code)
  }

  public async handle(
    { message, status, code }: this,
    { response }: HttpContextContract
  ) {
    response.status(status).send({ errors: [{ message, code }] })
  }
}
