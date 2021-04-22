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

    // add_cart_ ajax
    public async add_cart_ajax({ view, request, session }: HttpContextContract) {

        const dataHoaDon = request.all()

        var ssID = session.sessionId
        var ssgiohang = session.get('giohang'); // check xem có ton tai seccsion cart chưa?
        if (ssgiohang == true) {
            // khi giỏ hàng đã tồn tại
            var coutProduct = 0;
            // check san pham đó đã tồn tại trong giỏ hàng đó hay chưa
            ssgiohang.forEach(element => {
                if (element['produc_id'] == dataHoaDon['product_id']) {
                    // nếu đã tồn tại thì thêm số lượng lên 1 đơn vị
                    coutProduct++
                }
                if (element['produc_id'] != dataHoaDon['product_id']) {
                    var addNewProductToCart = [{
                        'ssID': ssID,
                        'product_id': dataHoaDon['cart_product_id'],
                        'product_name': dataHoaDon['cart_product_name'],
                        'product_giaban': dataHoaDon['cart_product_giaban'],
                        'product_hinhanh': dataHoaDon['cart_product_hinhanh'],
                        'product_soluong': dataHoaDon['cart_product_soluong']
                    }]
                    session.put('giohang', addNewProductToCart)
                }
            });
        } else {
            console.log(ssgiohang, "ss gio hang")
            // khi giỏ hàng chưa có  , thì sẽ tạo 1 giỏ hàng mới
            var cart = [{
                'ssID': ssID,
                'product_id': dataHoaDon['cart_product_id'],
                'product_name': dataHoaDon['cart_product_name'],
                'product_giaban': dataHoaDon['cart_product_giaban'],
                'product_hinhanh': dataHoaDon['cart_product_hinhanh'],
                'product_soluong': dataHoaDon['cart_product_soluong']
            }];

            session.put('giohang', cart)
            var datass = session.get('giohang')
            console.log('ssgio hang moi them ', datass)
        }
    }
}
