import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Loaisanphams extends BaseSchema {
  protected tableName = 'loaisanphams'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('tenloai')
      table.string('mota')
      table.string('logo')
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
