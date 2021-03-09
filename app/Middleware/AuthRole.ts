import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthRole {
  public async handle({ response, auth }: HttpContextContract,
    next: () => Promise<void>,
    args: any) {
    const role = auth.user?.role
    if (args != role) {
      return response.redirect('admin/login')
    }
    await next()
  }
}
