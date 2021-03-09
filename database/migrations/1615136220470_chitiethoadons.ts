import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chitiethoadons extends BaseSchema {
  protected tableName = 'chitiethoadons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_hoadon').unsigned().references('id').inTable('hoadons').onDelete('CASCADE')
      table.integer('id_sanpham').unsigned().references('id').inTable('sanphams').onDelete('CASCADE')
      table.integer('thanhtien').notNullable()
      table.integer('soluong').notNullable()
      table.string('ghichu')
      table.boolean('trangthai').defaultTo(1)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
