import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sanpham from './Sanpham'
import { BelongsTo } from '@ioc:Adonis/Lucid/Relations'
import Hoadon from './Hoadon'

export default class Chitiethoadon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_sp' })
  public sanphamId: number

  @belongsTo(() => Sanpham)
  public sanpham: BelongsTo<typeof Sanpham>

  @column({ columnName: 'id_hd' })
  public hoadonId: number

  @belongsTo(() => Hoadon)
  public hoadon: BelongsTo<typeof Hoadon>

  @column()
  public soluong: number

  @column()
  public thanhtien: number

  @column()
  public ghichu: string

  @column()
  public danhgia: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
