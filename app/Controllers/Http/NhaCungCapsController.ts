import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Nhacungcap from 'App/Models/Nhacungcap'
import Loaisanpham from 'App/Models/Loaisanpham'


export default class NhaCungCapsController {

  // VIEW INDEX
  public async index({ view }: HttpContextContract) {
    const loaiSP = await Loaisanpham.all()
    const dataNCC = await Nhacungcap.query().select('*').from('nhacungcaps')
    return view.render('admin/nhaCungCap', { dataNCC, loaiSP })
  };

  // THÊM NHÀ CUNG CẤP
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataNCC = request.only(['tennhacungcap', 'diachi', 'phone', 'email'])
      await Nhacungcap.create(dataNCC)
      return response.redirect('back')

    } catch (error) {
      return response.json('thêm thất bại')
    }
  };

  // CẬP NHẬT NHÀ CUNG CẤP
  public async updateNCC({ response, request, params }: HttpContextContract) {
    try {
      const data = request.only(['tennhacungcap', 'diachi', 'phone', 'email'])
      const idncc = params.id
      await Nhacungcap.query().where('id', idncc).update({
        tennhacungcap: data.tennhacungcap,
        diachi: data.diachi,
        phone: data.phone,
        email: data.email
      })
      return response.redirect('back')
    } catch (error) {
      return response.json('that bai')
    }
  };

  // CẬP NHẬT TRẠNG THÁI NHÀ CUNG CẤP
  public async deleteNCC({ response, params }: HttpContextContract) {
    try {
      const idncc = params.id
      await Nhacungcap.query().where('id', idncc).update({ trangthai: 0 })
      return response.redirect('back')
    } catch (error) {
      return response.json('Thất bại')
    }
  };

  // REVERT TRẠNG THÁI NHÀ CUNG CẤP
  public async revertNCC({ response, params }: HttpContextContract) {
    try {
      const idncc = params.id
      await Nhacungcap.query().where('id', idncc).update({ trangthai: 1 })
      return response.redirect('back')
    } catch (error) {
      return response.json('Thất bại')
    }
  };

}
