import { DateTime } from 'luxon'
import { BaseModel, column,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Doituong extends BaseModel {
  @column({ isPrimary: true})
  public id: number

  @column()
  public doituong:string

  @column()
  public mota:string

  @column()
  public trangthai:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
