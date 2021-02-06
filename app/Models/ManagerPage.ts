import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class ManagerPage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Role)
  public role: HasOne<typeof Role>

  @column()
  public roleid: number

  @column()
  public quanly: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
