
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Khachhang from 'App/Models/Khachhang'
import Loaisanpham from 'App/Models/Loaisanpham'
import Sanpham from 'App/Models/Sanpham'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {

    public async viewSanPham({ view, response, request, params }: HttpContextContract) {
        const dataLoaiSP = await Loaisanpham.query().select('*').from('loaisanphams')
        const idlsp = request.input("id", dataLoaiSP[0].id)
        const listDataSP = await Sanpham.query().select('*').from('sanphams').where('id_lsp', idlsp).preload('loaisanpham').preload('khachhang')
        return view.render('home/product', { dataLoaiSP, listDataSP })

    }


    // VIEW TABLE PRODUCT DA XOA
    public async viewTableDestroy({ view, response, request }: HttpContextContract) {
        const datasanpham = await Sanpham.query().select('*').from('sanphams').where('trangthai', 0)
            .preload('khachhang').preload('loaisanpham')

        return view.render('admin/viewTableDestroy', { datasanpham })
    }

    // view form them
    public async formThem({ view, response, request }: HttpContextContract) {
        // const dataLoaiSP = await Loaisanpham.all()
        return view.render('admin/formTable')
    }

    // // POST THEM SAN PHAM
    // public async themSanPham({ view, response, request, session }: HttpContextContract) {
    //     try {
    //         const hinhanh = request.file('hinhanh', {
    //             size: '1mb',
    //             extnames: ['jpg, png, jpeg']
    //         })
    //         const name = `${new Date().getTime()}.${hinhanh?.extname}`
    //         if (!hinhanh) {
    //             return 'Please upload file'
    //         }
    //         await hinhanh.move(Application.publicPath('uploads'), {
    //             name: name,
    //         })

    //         const data = request.only(['tensanpham', 'hinhanh', 'size', 'giaban', 'color', 'trangthai', 'mota', 'id_lsp', 'id_doituong'])
    //         data.hinhanh = name
    //         const sanpham = await Sanpham.create(data);
    //         const loaisp = await Loaisanpham.find('id_lsp', data.id_lsp)

    //         const doituong = await Doituong.find('id_doituong', data.id_doituong)

    //         if (loaisp == null || doituong == null) {
    //             return response.redirect('back')
    //         } else {
    //             await sanpham.related('loaisanpham').associate(loaisp);

    //             await sanpham.related('doituong').associate(doituong)

    //             session.flash({ success: 'Thêm sản phẩm thành công' });
    //             return response.redirect('/page-admin/quan-ly-san-pham')
    //         }
    //     } catch (error) {
    //         session.flash({ success: 'Thêm sản phẩm thất bại' });
    //         return response.redirect('back')
    //     }
    // }

    // VIEW CHI TIET SAN PHAM
    public async viewChiTietSP({ view, response, request, params }: HttpContextContract) {

        const id = params.id
        const dataSPbyID = await Sanpham.query().select('*').from('sanphams').where('id', id).preload('loaisanpham').preload('khachhang')

        return view.render('home/chitietsanpham', { dataSPbyID })
    }




    // POST CHUYEN TRANG THAI NGUNG KINH DOANH
    public async deleteSanPham({ view, response, request, params }: HttpContextContract) {
        try {
            const id = params.id
            await Sanpham.query().where('id', id).update({ trangthai: 0 }) // chuyển trạng thái về 0 , mặc định là 1
            return response.redirect('back')
        } catch (error) {
            return response.json('that bai')
        }
    }

    // POST CHUYEN TRANG THAI KINH DOANH TRO LAI
    public async revertSanPham({ view, response, request, params }: HttpContextContract) {
        try {
            const id = params.id
            await Sanpham.query().where('id', id).update({ trangthai: 1 }) // chuyển trạng thái về 1,
            return response.redirect('back')
        } catch (error) {
            return response.json('that bai')
        }
    }

    // UPDATE SAN PHAM
    public async updateSanPham({ view, response, request, params }: HttpContextContract) {
        try {
            const hinhanh = request.file('hinhanh');
            const name = `${new Date().getTime()}.${hinhanh?.extname}`
            if (!hinhanh) {
                return 'Please upload file'
            }
            await hinhanh.move(Application.publicPath('uploads'), {
                name: name,
            })
            const data = request.only(['tensanpham', 'hinhanh', 'size', 'giaban', 'color', 'trangthai', 'mota', 'id_lsp', 'id_doituong'])
            data.hinhanh = name
            const id = params.id
            await Sanpham.query().where('id', id)
                .update({
                    tensanPham: data.tensanpham,
                    size: data.size,
                    giaban: data.giaban,
                    color: data.color,
                    mota: data.mota,
                    hinhanh: name,
                    id_doituong: data.id_doituong,
                    id_lsp: data.id_lsp
                })
            return response.redirect('back')
        } catch (error) {
            return response.json({
                message: 'Cập nhật thất bại',
                error
            })
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
    // GET LISTDATA ADIDAS
    public async dataSPTheoLSP({ view, response, request, params }: HttpContextContract) {
        try {
            const idlsp = params.id
            const listDataSP = await Sanpham.query().select('*').from('sanphams').where('id_lsp', idlsp).preload('loaisanpham').preload('doituong')
            return response.json(listDataSP)
        } catch (error) {
            return console.log(error)
        }
    }

}
