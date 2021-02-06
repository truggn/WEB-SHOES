import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sanphams extends BaseSchema {
  protected tableName = 'sanphams'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_doituong').unsigned().references('id').inTable('doituongs').onDelete('CASCADE')
      table.integer('id_lsp').unsigned().references('id').inTable('loaisanphams').onDelete('CASCADE')
      table.string('tensanpham')
      table.string('hinhanh')
      table.string('size')
      table.string('color')
      table.integer('giaban')
      table.string('mota')
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
