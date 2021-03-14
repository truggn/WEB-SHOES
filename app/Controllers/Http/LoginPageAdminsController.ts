import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginPageAdminsController {

  // VIEW LOGIN PAGE
  public async index({ view }: HttpContextContract) {
    return view.render('home/login')
  }
  // POST LOGIN PAGE
  public async store({ response, request, auth }: HttpContextContract) {
    const rememBerMe = !!request.input('checkMe')
    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password, rememBerMe)
    const roles = auth.user?.role;
    if (roles == 'admin') {
      return response.redirect('/page-admin')
    } else {
      return response.redirect('back')
    }
  };

  // GET REGISTER
  async viewRegister({ view, }: HttpContextContract) {
    return view.render('home/register')
  }

  //POST REGISTER
  public async postRegister({ request, response }: HttpContextContract) {
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

    return response.json(user)
  }
  // POST LOGOUT-PAGE
  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect('admin/login')
  }
  // VIEW FORGET PASS
  public async viewForgetPass({ view }: HttpContextContract) {
    return view.render('home/forgetPass')
  }
  // POST FORGET PASS
  public async postForgetPass({ response, request }: HttpContextContract) {
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
