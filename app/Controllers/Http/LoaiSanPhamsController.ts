import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Loaisanpham from 'App/Models/Loaisanpham'
import Application from '@ioc:Adonis/Core/Application'
export default class LoaiSanPhamsController {

  // VIEW INDEX
  public async index({ view }: HttpContextContract) {
    const dataLSP = await Loaisanpham.query().select('*').from('loaisanphams')
    return view.render('admin/danhMucLoaiSP', { dataLSP })
  };

  // THÊM LOẠI 
  public async store({ request, response }: HttpContextContract) {
    try {
      const newLoaiSanPham = new Loaisanpham()
      newLoaiSanPham.tenloai = request.input('tenloai')
      newLoaiSanPham.mota = request.input('mota')
      const logo = request.file('logo')
      const name = `${new Date().getTime()}.${logo?.extname}`
      if (!logo) {
        return 'Please upload file'
      }
      await logo.move(Application.publicPath('uploads/logo'), {
        name: name,
      })
      newLoaiSanPham.logo = name
      await newLoaiSanPham.save()
      return response.redirect('back')
    } catch (error) {
      return response.json('thêm thất bại')
    }
  };

  // DELETE LOAI SAN PHAM
  public async deleteLoaiSanPham({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Loaisanpham.query().where('id', id).update({ trangthai: 0 })
      return response.redirect('back')
    } catch (error) {
      return response.json('that bai')
    }
  };

  // REVERT LOAI SAN PHAM 
  public async revertLoaiSanPham({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Loaisanpham.query().where('id', id).update({ trangthai: 1 })
      return response.redirect('back')
    } catch (error) {
      return response.json('that bai')
    }
  };

  // UPDATE LOAI SAN PHAM 
  public async updateLoaiSanPham({ response, request, params }: HttpContextContract) {
    try {
      const logo = request.file('logo')
      const name = `${new Date().getTime()}.${logo?.extname}`
      if (!logo) {
        return 'Please upload file'
      }
      await logo.move(Application.tmpPath('uploads/logo'), {
        name: name,
      })
      const data = request.only(['tenloai', 'mota', 'logoupdate'])
      data.logoupdate = name
      const id = params.id
      await Loaisanpham.query().where('id', id).update({
        tenloai: data.tenloai,
        mota: data.mota,
        logo: name
      })
      return response.redirect('back')
    } catch (error) {
      return response.json('Cập nhật thất bại!')
    }
  };

}
