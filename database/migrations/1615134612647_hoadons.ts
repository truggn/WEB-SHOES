import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hoadons extends BaseSchema {
  protected tableName = 'hoadons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('tongtien')
      table.integer('phiship')
      table.string('hoten')
      table.string('diachi')
      table.string('sdt')
      table.string('email')
      table.string('loinhan')
      table.boolean('trangthai').defaultTo(1) // 1: chua thanh toan// 0 da thanh toan
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
