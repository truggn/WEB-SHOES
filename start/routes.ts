/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import DoiTuongsController from 'App/Controllers/Http/DoiTuongsController'
import HomeController from 'App/Controllers/Http/HomeController'
import SanPhamsController from 'App/Controllers/Http/SanPhamsController'
import ThongKesController from 'App/Controllers/Http/ThongKesController'
import UsersController from 'App/Controllers/Http/UsersController'

Route.group(() => {
    Route.get('/register', 'homeController.viewregister')
    Route.post('/register', 'homeController.postregister')

})
Route.get('/forget-password', 'homeController.viewforgetPass')
Route.post('/forget-password', 'homeController.postForgetPass')

// ROUTER HOME 
Route.group(() => {
    Route.get('/logout', 'homeController.logout')
    Route.get('/home', 'homeController.index')
    Route.get('/cart', 'billsController.viewHoaDon')
})

// ROUTER PRODUCT
Route.group(() => {
    Route.get('/san-pham', 'productsController.viewHomeSanPham')
    Route.get('/san-pham/:id', 'productsController.viewChiTietSP')
    Route.post('/product/them-san-pham', 'productsController.themSanPham')


})

// ROUTER ADMIN
Route.group(() => {

    Route.get('/page-admin/san-pham', 'ProductsController.viewSanPham')
    Route.get('/page-admin/san-pham/khong-ban', 'productsController.viewTableDestroy')
    Route.get('/page-admin/manager-page', 'AdminsController.viewManager')


    // POST
    Route.post('/page-admin/login-page-admin', 'AdminsController.loginPageAdmin')
    Route.post('/page-admin/san-pham/update/:id', 'productsController.updateSanPham')

})
// ROTER GIO HANG
Route.post('/cart', 'BillsController.addToCart')
Route.resource('/login', 'LoginPageAdminsController')

Route.group(() => {
    // ROUTER LOAI SAN PHAM
    Route.resource('/admin/loai-san-pham', 'LoaiSanPhamsController')

    // ROUter DOI TUONG
    Route.resource('/admin/khach-hang', 'DoiTuongsController')

    // ROUTER SAN PHAM
    Route.resource('/admin/san-pham', 'SanPhamsController')

    // ROUTER THONG KE
    Route.resource('/admin/thong-ke', 'ThongKesController')

    // ROUTE NHAP HANG
    Route.resource('/admin/quan-ly-nhap-hang', 'PhieunhapsController')

    // ROUTE NHA CUNG CAP
    Route.resource('/admin/quan-ly-nha-cung-cap', 'NhaCungCapsController')

    // ROUTER QUAN LY KHO
    Route.resource('/admin/quan-ly-kho', 'QuanlykhosContronller')

    // ROUTER ADMIN
    Route.resource('/admin', 'PageadminsController')

    // LOAI SAN PHAM
    Route.post('admin/loai-san-pham/deletelsp/:id', 'LoaiSanPhamsController.deleteLoaiSanPham')

    Route.post('admin/loai-san-pham/updatelsp/:id', 'LoaiSanPhamsController.updateLoaiSanPham')

    Route.post('admin/loai-san-pham/revertlsp/:id', 'LoaiSanPhamsController.revertLoaiSanPham')

    // SAN PHAM
    Route.post('admin/san-pham/deletesp/:id', 'SanPhamsController.deleteSanPham')
    Route.post('admin/san-pham/revertsp/:id', 'SanPhamsController.revertSanPham')
    Route.post('admin/san-pham/khuyenmai/:id', 'SanPhamsController.themKhuyenMai')
    Route.post('admin/san-pham/hetkhuyenmai/:id', 'SanPhamsController.hetKhuyenMai')
    Route.post('admin/san-pham/update/:id', 'SanPhamsController.updateSanPham')

    // NHA CUNG CAP 
    Route.post('admin/quan-ly-nha-cung-cap/update/:id', 'NhaCungCapsController.updateNCC')
    Route.post('admin/quan-ly-nha-cung-cap/delete/:id', 'NhaCungCapsController.deleteNCC')
    Route.post('admin/quan-ly-nha-cung-cap/revert/:id', 'NhaCungCapsController.revertNCC')

    // KHÁCH HÀNG
    Route.post('admin/khach-hang/edit/:id', 'DoiTuongsController.editDoiTuong')
    Route.post('admin/khach-hang/delete/:id', 'DoiTuongsController.deleteDoiTuong')
    Route.post('admin/khach-hang/revert/:id', 'DoiTuongsController.revertDoiTuong')



}).middleware(['auth', 'role:admin'])



// ROUTER USER
Route.resource('/trang-chu', 'UsersController')



