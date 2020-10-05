import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary().notNullable()
      table.string('name', 255).notNullable()
      table.string('username', 255).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('is_active').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
