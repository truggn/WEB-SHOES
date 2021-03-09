import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsController {
    // View người dùng
    public async viewManager({ view, response, request }: HttpContextContract) {
        return view.render('admin/manager')
    }
    // View khách hàng
    public async viewKhachHang({ view, response, request }: HttpContextContract) {
        return view.render('admin/loaddataKhachHang')
    }
}
