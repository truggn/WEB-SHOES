import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginPageAdminsController {
  public async index({ view }: HttpContextContract) {
    return view.render('home/login')
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const rememBerMe = !!request.input('checkMe')
    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password, rememBerMe)
    const roles = auth.user?.role;
    if (roles == 'admin') {
      return response.redirect('/admin')
    } else {
      return response.redirect('back')
    }
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
