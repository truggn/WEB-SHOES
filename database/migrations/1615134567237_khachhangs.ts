import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Khachhangs extends BaseSchema {
  protected tableName = 'khachhangs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('doituong').notNullable()
      table.string('mota')
      table.boolean('trangthai').defaultTo(1) // 1: con kinh doanh, // 0: ko kinh doanh
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
