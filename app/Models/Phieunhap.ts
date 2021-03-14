import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import user from './Users'
import Nhacungcap from './Nhacungcap'

export default class Phieunhap extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_user' })
  public userId: number

  @belongsTo(() => user)
  public user: BelongsTo<typeof user>

  @column({ columnName: 'id_ncc' })
  public nhacungcapId: number

  @belongsTo(() => Nhacungcap)
  public nhacungcap: BelongsTo<typeof Nhacungcap>

  @column()
  public tongtien: number

  @column()
  public solo: number

  @column()
  public vat: number

  @column()
  public nocong: number

  @column()
  public trangthai: boolean

  @column()
  public ghichu: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
