import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chitietphieunhaps extends BaseSchema {
  protected tableName = 'chitietphieunhaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_pn').unsigned().references('id').inTable('phieunhaps').onDelete('CASCADE')
      table.integer('id_sp').unsigned().references('id').inTable('sanphams').onDelete('CASCADE')
      table.string('tensanpham').notNullable()
      table.integer('soluong').notNullable()
      table.integer('gianhap').notNullable()
      table.integer('size')
      table.string('donvitinh').defaultTo('đôi')
      table.integer('thanhtien')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
