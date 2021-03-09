import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PhieunhapsController {
  public async index({ view, response, request }: HttpContextContract) {
    return view.render('admin/nhapHang')
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ }: HttpContextContract) {
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
