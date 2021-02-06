import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class AdminsController {
    // GET VIEW HOME ADMIN
    public async homeAdmin({ view, response, request }: HttpContextContract) {
        return view.render('admin/index')
    }
    // View người dùng
    public async viewManager({ view, response, request }: HttpContextContract) {
        return view.render('admin/manager')
    }
    // View khách hàng
    public async viewKhachHang({ view, response, request }: HttpContextContract) {
        return view.render('admin/loaddataKhachHang')
    }
    // VIEW LODIN PAGE ADMIN
    public async viewloginPageAdmin({ view, response, request }: HttpContextContract) {
        return view.render('admin/login-page-admin')
    }
    // POST LOGIN PAGE ADMIN
    public async loginPageAdmin({ view, response, request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        await auth.attempt(email, password)

        response.redirect('page-admin')

    }

}
