import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nhacungcaps extends BaseSchema {
  protected tableName = 'nhacungcaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('tennhacungcap', 50).notNullable(),
        table.string('diachi', 255).notNullable(),
        table.string('phone', 15).notNullable(),
        table.string('email', 255).notNullable()
      table.boolean('trangthai').defaultTo(1)// 1: kinh doanh , 0: ko  kinh doanh
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
