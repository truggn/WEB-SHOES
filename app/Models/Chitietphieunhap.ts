import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Phieunhap from './Phieunhap'
import Sanpham from './Sanpham'


export default class Chitietphieunhap extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_pn' })
  public phieunhapId: number

  @belongsTo(() => Phieunhap)
  public phieunhap: BelongsTo<typeof Phieunhap>

  @column({ columnName: 'id_sp' })
  public sanphamId: number

  @belongsTo(() => Sanpham)
  public sanpham: BelongsTo<typeof Sanpham>

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
