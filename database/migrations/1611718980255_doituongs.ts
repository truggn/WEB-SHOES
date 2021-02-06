import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doituongs extends BaseSchema {
  protected tableName = 'doituongs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('doituong').notNullable()
      table.string('mota')
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
