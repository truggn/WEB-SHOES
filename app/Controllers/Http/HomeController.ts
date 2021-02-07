import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'
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
    

    // GET REGISTER
    async viewregister({ view, request, response }: HttpContextContract) {
        return view.render('home/register')
    }

    //POST REGISTER
    public async postregister({ view, request, response }: HttpContextContract) {
        const validationSchema = schema.create({
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({ trim: true }, [
                rules.confirmed(),
            ]),
        })

        const userDetails = await request.validate({
            schema: validationSchema,
        })

        /**
         * Create a new user
         */

        const user = new User()
        user.email = userDetails.email
        user.password = userDetails.password
        await user.save()

        return response.redirect('login')
    }

    // GET VIEW LOGIN
    public async viewlogin({ view, request, response }: HttpContextContract) {
        return view.render('home/login')
    }

    // POST VIEW LOGIN
    public async postlogin({ view, request, response, auth }: HttpContextContract) {

        const rememBerMe = !!request.input('checkMe')
        const email = request.input('email')
        const password = request.input('password')

        await auth.attempt(email, password, rememBerMe)

        response.redirect('page-admin')
    }
    // POST VIEW PROFILE
    public async profile({ view, auth }: HttpContextContract) {
        return auth.user;
    }
    // POST LOGOUT-PAGE
    public async logout({ view, response, auth }: HttpContextContract) {
        await auth.logout()
        return response.redirect('/login')
    }
    // VIEW FORGET PASS
    public async viewforgetPass({ view, response, request }: HttpContextContract) {
        return view.render('home/forgetPass')
    }
    // POST FORGET PASS
    public async postForgetPass({ view, response, request }: HttpContextContract) {
        const email = request.input('email')
        const data = await User.query().select('*').from('users').where('email', email).first();
        if (data) {
            data.password = request.input('password')
            await data.save();
            return response.redirect('login')
        } else {

            return response.redirect('back')
        }


    }
}

