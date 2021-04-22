
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Khachhang from 'App/Models/Khachhang'
import Loaisanpham from 'App/Models/Loaisanpham'
import Sanpham from 'App/Models/Sanpham'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {

    public async viewSanPham({ view, request }: HttpContextContract) {
        const idkh = request.input('idkh')
        const idlsp = request.input('idlsp')
        const doituong = await Khachhang.all()
        const loaiSP = await Loaisanpham.all()
        if (idlsp) {
            const dataSP = await Sanpham.query().select('*').from('sanphams').where({ 'id_lsp': idlsp, trangthai: 1 }).preload('loaisanpham')
            return view.render('home/shop', { doituong, loaiSP, dataSP })

        } else if (idkh) {
            const dataSP = await Sanpham.query().select('*').from('sanphams').where({ 'id_doituong': idkh, trangthai: 1 }).preload('khachhang')
            return view.render('home/shop', { doituong, loaiSP, dataSP })

        } else {
            const dataSP = await Sanpham.query().select('*').from('sanphams').where({ trangthai: 1 })
            return view.render('home/shop', { doituong, loaiSP, dataSP })

        }

    }

    // VIEW CHI TIET SAN PHAM
    public async viewDetail({ view, response, params }: HttpContextContract) {
        try {
            const id = params.id
            const dataSPbyID = await Sanpham.query().select('*').from('sanphams').where('id', id).preload('loaisanpham').preload('khachhang')
            return view.render('home/shop', dataSPbyID)
        } catch (error) {
            return response.json(error)
        }
    }

    // UPDATE LOAI SAN PHAM
    // public async updateLoaiSanPham({ view, response, request, params }: HttpContextContract) {
    //     try {
    //         const logo = request.file('logo')
    //         const name = `${new Date().getTime()}.${logo?.extname}`
    //         if (!logo) {
    //             return 'Please upload file'
    //         }
    //         await logo.move(Application.tmpPath('uploads/logo'), {
    //             name: name,
    //         })
    //         const data = request.only(['tenloai', 'mota', 'logo'])
    //         data.logo = name
    //         const id = params.id
    //         await Loaisanpham.query().where('id', id).update({
    //             tenloai: data.tenloai,
    //             mota: data.mota,
    //             logo: name
    //         })
    //         return response.redirect('back')

    //     } catch (error) {
    //         return response.json('Update lsp that bai')
    //     }
    // }
    // // GET LISTDATA ADIDAS
    // public async dataSPTheoLSP({ view, response, request, params }: HttpContextContract) {
    //     try {
    //         const idlsp = params.id
    //         const listDataSP = await Sanpham.query().select('*').from('sanphams').where('id_lsp', idlsp).preload('loaisanpham').preload('doituong')
    //         return response.json(listDataSP)
    //     } catch (error) {
    //         return console.log(error)
    //     }
    // }

}
