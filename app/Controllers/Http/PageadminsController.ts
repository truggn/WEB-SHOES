import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PageadminsController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/index')
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
