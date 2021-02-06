import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hoadons extends BaseSchema {
  protected tableName = 'hoadons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('tongtien').notNullable()
      table.integer('phiship')
      table.string('hoten').notNullable()
      table.string('diachi').notNullable()
      table.string('sdt').notNullable()
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
