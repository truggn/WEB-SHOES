import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sanphams extends BaseSchema {
  protected tableName = 'sanphams'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_doituong').unsigned().references('id').inTable('khachhangs').onDelete('CASCADE')
      table.integer('id_lsp').unsigned().references('id').inTable('loaisanphams').onDelete('CASCADE')
      table.string('tensanpham').notNullable()
      table.string('hinhanh')
      table.string('size')
      table.string('color')
      table.integer('giaban')
      table.string('mota')
      table.integer('khuyenmai')
      table.boolean('trangthaikhuyenmai').defaultTo(0) // 0: ko km, 1: km
      table.boolean('trangthai').defaultTo(0) // 0: nhap va cung la ngung kinh doanh, 1: ban

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
