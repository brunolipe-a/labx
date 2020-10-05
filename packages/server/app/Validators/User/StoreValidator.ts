import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(private ctx: HttpContextContract) {}

  /**
   * Defining a schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    name: schema.string(),
    username: schema.string({}, [
      rules.regex(/^[a-z0-9_-]{3,15}$/),
      rules.unique({ table: 'users', column: 'username' })
    ]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed()])
  })

  /**
   * The `schema` first gets compiled to a reusable function and then that compiled
   * function validates the data at runtime.
   *
   * Since, compiling the schema is an expensive operation, you must always cache it by
   * defining a unique cache key. The simplest way is to use the current request route
   * key, which is a combination of the route pattern and HTTP method.
   */
  public cacheKey = this.ctx.routeKey

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages = {
    'email.string': "O campo deve ser do tipo 'string'",
    'email.unique': 'E-mail já cadastrado',
    'email.email': 'E-mail precisa ser um email valído',
    'name.required': 'Campo nome é obrigatório',
    'username.string': "O campo deve ser do tipo 'string'",
    'username.regex': 'Nome de usuário fora do padrão',
    'username.unique': 'Esse nome de usuário não está disponível',
    'password.minLength': 'Senha deve ser no mínimo seis caracteres',
    'password_confirmation.confirmed': 'Senha precisa da confirmação'
  }
}
