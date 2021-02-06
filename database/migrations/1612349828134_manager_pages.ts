import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ManagerPages extends BaseSchema {
  protected tableName = 'manager_pages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_role').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.string('quanly')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
