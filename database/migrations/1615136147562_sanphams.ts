import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sanphams extends BaseSchema {
  protected tableName = 'sanphams'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_doituong').unsigned().references('id').inTable('khachhangs').onDelete('CASCADE')
      table.integer('id_lsp').unsigned().references('id').inTable('loaisanphams').onDelete('CASCADE')
      table.string('tensanpham').notNullable()
      table.string('hinhanh').notNullable()
      table.string('size').notNullable()
      table.string('color').notNullable()
      table.integer('giaban').notNullable()
      table.string('mota')
      table.integer('khuyenmai')
      table.boolean('trangthaikhuyenmai').defaultTo(1)
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}