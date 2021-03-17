import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Loaisanpham from 'App/Models/Loaisanpham'
import Khachhang from 'App/Models/Khachhang'
import Chitietphieunhap from 'App/Models/Chitietphieunhap'
import Phieunhap from 'App/Models/Phieunhap'
import Nhacungcap from 'App/Models/Nhacungcap'
import User from 'App/Models/Users'
import Sanpham from 'App/Models/Sanpham'


export default class PhieunhapsController {
  public async index({ view }: HttpContextContract) {
    const dataPN = await Phieunhap.query().select('*').from('phieunhaps').preload('nhacungcap')
    const dataCTPN = await Chitietphieunhap.query().select('*').from('chitietphieunhaps').preload('phieunhap').preload('sanpham')
    return view.render('admin/nhapHang', { dataPN, dataCTPN })
  }

  public async create({ view, auth }: HttpContextContract) {

    const dataLoaiSP = await Loaisanpham.all()
    const dataKhachHang = await Khachhang.all()
    const dataSP = await Sanpham.all()
    const dataNCC = await Nhacungcap.all()
    const admin = auth.user;


    return view.render('admin/danhMucNhapHang', { dataKhachHang, dataLoaiSP, dataNCC, dataSP, admin, })
  }



  public async store({ response, request, auth }: HttpContextContract) {

    const nd = auth.user;
    // tạo phiếu nhập, phiếu nhập tồn tại 3 trạng thái. ['chua thanh toan', 'đã thanh toán', 'phiếu nợ'].
    const dataPN = request.only(['tongtien', 'vat', 'solo', 'trangthai', 'id_user', 'id_sp', 'id_ncc', 'ghichu', 'tratruoc'])
    const ncc = await Nhacungcap.find(dataPN.id_ncc)
    dataPN.id_user = nd?.id
    const pn = await Phieunhap.create(dataPN)


    if (ncc != null) {
      await pn.related('nhacungcap').associate(ncc);
      //   // sau khi tạo phiếu nhập thì thực hiện tạo chi tiết phiếu nhập

      const dataCTPN = request.only(['id_pn', 'id_sp', 'tensanpham', 'soluong', 'gianhap', 'thanhtien', 'size'])
      var tongTien = 0;

      for (var i = 0; i < dataCTPN.tensanpham.length; i++) {

        const CTPN = await Chitietphieunhap.create(
          {
            tensanpham: dataCTPN.tensanpham[i],
            soluong: dataCTPN.soluong[i],
            gianhap: dataCTPN.gianhap[i],
            size: dataCTPN.size[i],
            thanhtien: dataCTPN.soluong[i] * dataCTPN.gianhap[i]
          })
        tongTien += CTPN.thanhtien

        await CTPN.related('phieunhap').associate(pn)
        // await CTPN.related('sanpham').associate(sanpham)
      }
      const vat = (tongTien * (dataPN.vat / 100))
      pn.tongtien = tongTien + vat
      await pn.save()
      return response.redirect('/page-admin/quan-ly-nhap-hang')
    } else {
      return false;
    }
  };


  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }

}
