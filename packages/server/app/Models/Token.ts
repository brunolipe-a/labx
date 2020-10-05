import { DateTime } from 'luxon'
import { v4 as uuid, validate } from 'uuid'

import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column
} from '@ioc:Adonis/Lucid/Orm'

import User from './User'

export default class Token extends BaseModel {
  public static table = 'api_tokens'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public token: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public expiresAt: DateTime

  @beforeSave()
  public static async hashToken(token: Token) {
    if (validate(token.token)) {
      return
    }

    if (token.$dirty.token) {
      token.token = await Hash.make(token.token)
    } else {
      token.token = uuid()
    }
  }
}
