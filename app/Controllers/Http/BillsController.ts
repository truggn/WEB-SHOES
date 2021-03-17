import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sanpham from 'App/Models/Sanpham'

export default class BuillsController {
    // GET VIEW HÓA ĐƠN

    public async viewHoaDon({ view, response, request }: HttpContextContract) {
        return view.render('home/viewCart')
    }
    public async checkout({ view }: HttpContextContract) {
        return view.render('home/checkout')
    }
    // public async addToCart({ view, request, response }: HttpContextContract) {
    //     const dataHoaDon = request.only([''])

    // }



}
