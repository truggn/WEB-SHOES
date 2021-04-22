import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Loaisanpham from 'App//Models/Loaisanpham'

export default class AdminsController {
    // View người dùng
    public async viewAdmin_Manager({ view }: HttpContextContract) {
        const loaiSP = await Loaisanpham.all()
        return view.render('admin/index', { loaiSP })
    }
    // View khách hàng
    public async viewKhachHang({ view }: HttpContextContract) {
        return view.render('admin/loaddataKhachHang')
    }
}
