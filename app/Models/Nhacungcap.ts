import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Nhacungcap extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tennhacungcap: string

  @column()
  public diachi: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public trangthai: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
