import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Chitiethoadon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public soluong:number

  @column()
  public thanhtien:number

  @column()
  public ghichu:string

  @column()
  public danhgia:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
