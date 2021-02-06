import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chitiethoadons extends BaseSchema {
  protected tableName = 'chitiethoadons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_hd').unsigned().references('id').inTable('hoadons').onDelete('CASCADE')
      table.integer('id_sp').unsigned().references('id').inTable('sanphams').onDelete('CASCADE')
      table.integer('soluong')
      table.integer('thanhtien')
      table.string('ghichu')
      table.integer('danhgia')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
