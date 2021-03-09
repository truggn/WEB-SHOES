import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chitietphieunhaps extends BaseSchema {
  protected tableName = 'chitietphieunhaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_sp').unsigned().references('id').inTable('sanphams').onDelete('CASCADE')
      table.integer('id_ncc').unsigned().references('id').inTable('nhacungcaps').onDelete('CASCADE')
      table.integer('id_pn').unsigned().references('id').inTable('phieunhaps').onDelete('CASCADE')
      table.string('soluong').notNullable()
      table.string('thanhtien').notNullable()
      table.string('ghichu')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
