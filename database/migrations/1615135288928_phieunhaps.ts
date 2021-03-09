import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phieunhaps extends BaseSchema {
  protected tableName = 'phieunhaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('tongtien').notNullable(),
        table.string('lo').notNullable()
      table.string('masothue')
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
