import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doituong from 'App/Models/Khachhang'

export default class DoiTuongsController {

  // VIEW INDEX
  public async index({ view, response }: HttpContextContract) {
    try {
      const dataDT = await Doituong.query().select('*').from('khachhangs')
      return view.render('admin/danhMucDoiTuong', { dataDT })
    } catch (error) {
      return response.json(error)
    }
  };

  // POST CREATE DOI TUONG
  public async store({ request, response }: HttpContextContract) {
    try {
      const dataDT = request.only(['doituong', 'mota'])
      await Doituong.create(dataDT)
    } catch (error) {
      return response.json(error)
    }
  };

  // UPDATE THONG TIN DOI TUONG KHACH HANG
  public async editDoiTuong({ response, request, params }: HttpContextContract) {
    try {
      const data = request.only(['doituong', 'mota'])
      const id = params.id
      await Doituong.query().where('id', id).update({
        doituong: data.doituong,
        mota: data.mota
      })
      return response.redirect('back')
    } catch (error) {
      return response.json(error)
    }
  };

  // DELETE THONG TIN DOI TUONG
  public async deleteDoiTuong({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Doituong.query().select('*').where('id', id).update({ trangthai: 0 })
      return response.redirect('back')
    } catch (error) {
      return response.json(error)
    }
  };

  // REVERT THONG TIN DOI TUONG
  public async revertDoiTuong({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Doituong.query().select('*').where('id', id).update({ trangthai: 1 })
      return response.redirect('back')
    } catch (error) {
      return response.json(error)
    }
  };


}
