import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, } from '@ioc:Adonis/Lucid/Orm'
import Loaisanpham from './Loaisanpham'
import Khachhang from './Khachhang'

export default class Sanpham extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_lsp' })
  public loaisanphamId: number

  @belongsTo(() => Loaisanpham)
  public loaisanpham: BelongsTo<typeof Loaisanpham>

  @column({ columnName: 'id_doituong' })
  public khachhangId: number

  @belongsTo(() => Khachhang)
  public khachhang: BelongsTo<typeof Khachhang>


  @column()
  public tensanpham: string

  @column()
  public hinhanh: string

  @column()
  public size: number

  @column()
  public color: string

  @column()
  public giaban: number

  @column()
  public mota: string

  @column()
  public trangthai: boolean

  @column()
  public khuyenmai: number

  @column()
  public trangthaikhuyenmai: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
