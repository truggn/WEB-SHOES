import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Phieunhap from './Phieunhap'


export default class Chitietphieunhap extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_pn' })
  public phieunhapId: number

  @belongsTo(() => Phieunhap)
  public phieunhap: BelongsTo<typeof Phieunhap>

  @column()
  public tensanpham: string

  @column()
  public soluong: number

  @column()
  public gianhap: number

  @column()
  public size: number

  @column()
  public thanhtien: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
