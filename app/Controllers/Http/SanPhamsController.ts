import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SanPham from 'App/Models/Sanpham'
import Loaisanpham from 'App//Models/Loaisanpham'
import Doituong from 'App/Models/Khachhang'
import Sanpham from 'App/Models/Sanpham'
import Application from '@ioc:Adonis/Core/Application'

export default class SanPhamsController {
  public async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 5
    const dataLoaiSP = await Loaisanpham.all()

    const kinhDoanh = await SanPham.query().select('*').from('sanphams').where({ trangthai: 1 })
      .preload('khachhang').preload('loaisanpham').paginate(page, limit)
    const ko_kinhDoanh = await SanPham.query().select('*').from('sanphams').where({ trangthai: 0 })
      .preload('khachhang').preload('loaisanpham').paginate(page, limit)
    const dataDT = await Doituong.all()
    return view.render('admin/danhSachSanPham', { kinhDoanh, ko_kinhDoanh, dataLoaiSP, dataDT })
  }

  public async create({ }: HttpContextContract) {
  }

  // SAN PHAM O TRANG THAI NHAP HANG
  public async store({ response, request, session }: HttpContextContract) {
    try {
      const data = request.only(['tensanpham', 'size', 'color', 'mota', 'id_lsp', 'id_doituong'])
      //data.hinhanh = name
      const sanpham = await Sanpham.create(data);
      const loaisp = await Loaisanpham.find('id_lsp', data.id_lsp)

      const doituong = await Doituong.find('id_doituong', data.id_doituong)

      if (loaisp == null || doituong == null) {
        return response.redirect('back')
      } else {
        await sanpham.related('loaisanpham').associate(loaisp);

        await sanpham.related('khachhang').associate(doituong)

        session.flash({ success: 'Thêm sản phẩm thành công' });
        return response.redirect('admin/san-pham')
      }
    } catch (error) {
      session.flash({ success: 'Thêm sản phẩm thất bại' });
      return response.redirect('back')
    }
  }

  // POST CHUYEN TRANG THAI NGUNG KINH DOANH
  public async deleteSanPham({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Sanpham.query().where('id', id).update({ trangthai: 0 }) // chuyển trạng thái về 0 
      return response.redirect('back')
    } catch (error) {
      return response.json('that bai')
    }
  };

  // POST CHUYEN TRANG THAI KINH DOANH TRO LAI
  public async kinhDoanhSanPham({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      await Sanpham.query().where('id', id).update({ trangthai: 1 }) // chuyển trạng thái về 1,
      return response.redirect('back')
    } catch (error) {
      return response.json('that bai')
    }
  }
  // UPDATE SAN PHAM
  public async updateSanPham({ response, request, params }: HttpContextContract) {
    try {
      const hinhanh = request.file('hinhanh');
      const name = `${new Date().getTime()}.${hinhanh?.extname}`
      if (!hinhanh) {
        return 'Please upload file'
      }
      await hinhanh.move(Application.publicPath('uploads'), {
        name: name,
      })
      const data = request.only(['tensanpham', 'hinhanh', 'size', 'giaban', 'color', 'trangthai', 'mota', 'id_lsp', 'id_doituong'])
      data.hinhanh = name
      const id = params.id
      await Sanpham.query().where('id', id)
        .update({
          tensanPham: data.tensanpham,
          size: data.size,
          giaban: data.giaban,
          color: data.color,
          mota: data.mota,
          hinhanh: name,
          id_doituong: data.id_doituong,
          id_lsp: data.id_lsp
        })
      return response.redirect('back')
    } catch (error) {
      return response.json({
        message: 'Cập nhật thất bại',
        error
      })
    }
  }

  // THEM KHUYEN MAI
  public async themKhuyenMai({ response, request, params }: HttpContextContract) {
    try {
      const id = params.id
      const khuyenmai = request.input('khuyenmai')
      await Sanpham.query().where('id', id).update({ khuyenmai, trangthaikhuyenmai: 1 }) // chuyển trạng thái về 0,
      return response.redirect('back')
    } catch (error) {
      return response.json('error')
    }
  }
  // HET KHUYEN MAI 
  public async hetKhuyenMai({ request, params }: HttpContextContract) {
    try {
      const id = params.id
      const khuyenmai = request.input('khuyenmai')
      await Sanpham.query().where('id', id).update({ khuyenmai, trangthaikhuyenmai: 0 }) // chuyển trạng thái về 0,

    } catch (error) {

    }
  };
  // POST THUC HIEN KINH DOANH SAN PHAM 
  public async kinhDoanh({ response, request, params }: HttpContextContract) {
    const id = params.id
    const data = request.only(['tensanpham', 'hinhanh', 'size', 'giaban', 'color', 'mota', 'id_lsp', 'id_doituong'])
    try {
      const hinhanh = request.file('hinhanh');
      const name = `${new Date().getTime()}.${hinhanh?.extname}`
      if (!hinhanh) {
        return 'Please upload file'
      }
      await hinhanh.move(Application.publicPath('uploads'), {
        name: name,
      });
      data.hinhanh = name
      await Sanpham.query().where('id', id)
        .update({
          tensanPham: data.tensanpham,
          size: data.size,
          giaban: data.giaban,
          color: data.color,
          mota: data.mota,
          hinhanh: name,
          trangthai: 1,
          id_doituong: data.id_doituong,
          id_lsp: data.id_lsp
        })
      return response.redirect('back')
    } catch (error) {
      return response.json({
        message: 'Cập nhật thất bại',
        error
      })
    }
  }

}
