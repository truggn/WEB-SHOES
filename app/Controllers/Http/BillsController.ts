 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sanpham from 'App/Models/Sanpham'

export default class BuillsController {
    // GET VIEW HÓA ĐƠN

    public async viewHoaDon({view , response , request }:HttpContextContract){
        return view.render('home/hoadon')
    }
    // POST ADD TO CART
    public async addToCart({view, response, request}: HttpContextContract){
            const id = request.input('id')
            const addSanPham = await Sanpham().find('id', id)
    }


}
