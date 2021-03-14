import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'
import SanPham from 'App/Models/Sanpham'
import Loaisanpham from 'App//Models/Loaisanpham'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HomeController {
    public async index({ view, request, response }: HttpContextContract) {

        const page = request.input('page', 1)
        const limit = 8
        const datasanpham = await SanPham.query().select('*').from('sanphams').preload('loaisanpham').paginate(page, limit)

        return view.render('home/index', { datasanpham })
    }


    // POST VIEW PROFILE
    public async profile({ view, auth }: HttpContextContract) {
        return auth.user;
    }

}

