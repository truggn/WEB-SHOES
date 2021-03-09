import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Khos extends BaseSchema {
  protected tableName = 'khos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_sp').unsigned().references('id').inTable('sanphams').onDelete('CASCADE')
      table.integer('soluong').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
