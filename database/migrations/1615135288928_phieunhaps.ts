import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phieunhaps extends BaseSchema {
  protected tableName = 'phieunhaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_ncc').unsigned().references('id').inTable('nhacungcaps').onDelete('CASCADE')
      table.integer('tongtien')
      table.integer('solo')
      table.integer('vat')
      table.integer('nocong').defaultTo(0)// 0: ko co no, 1: co no
      table.string('ghichu')
      table.boolean('trangthai').defaultTo(1) // 0: da thanh toan het, 1: Phieu nhap luu
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
