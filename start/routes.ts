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

// ROUTE LOGIN- REGISTER - LOGOUT
Route.group(() => {
    Route.get('/register', 'LoginPageAdminsController.viewRegister')
    Route.post('/register', 'LoginPageAdminsController.postRegister')
    Route.resource('/login', 'LoginPageAdminsController')
    Route.get('/logout', 'LoginPageAdminsController.logout')
    Route.get('/page-admin/forget-password', 'LoginPageAdminsController.viewForgetPass')
    Route.post('/page-admin/forget-password', 'LoginPageAdminsController.postForgetPass')

})

// ROUTER HOME 
Route.group(() => {

    Route.get('/trang-chu', 'homeController.index')
    Route.get('/gio-hang', 'billsController.viewHoaDon')
    Route.post('/gio-hang/addtocart', 'billsController.addToCart')
    Route.post('/gio-hang/add_cart_ajax', 'billsController.add_cart_ajax')
    Route.get('/gio-hang/checkout', 'billsController.checkout')
})

// ROUTER PRODUCT
Route.group(() => {
    Route.get('/san-pham', 'productsController.viewSanPham')

})

// ROUTER ADMIN
Route.group(() => {

    Route.get('/page-admin/manager-page', 'AdminsController.viewManager')

    // POST
    Route.post('/page-admin/login-page-admin', 'AdminsController.loginPageAdmin')


})



Route.group(() => {

    Route.get('/page-admin', 'AdminsController.viewAdmin_Manager')

    // ROUTER LOAI SAN PHAM
    Route.resource('page-admin/loai-san-pham', 'LoaiSanPhamsController')

    // ROUter DOI TUONG
    Route.resource('page-admin/khach-hang', 'DoiTuongsController')

    // ROUTER SAN PHAM
    Route.resource('page-admin/san-pham', 'SanPhamsController')

    // ROUTER THONG KE
    Route.resource('page-admin/thong-ke', 'ThongKesController')

    // ROUTE NHAP HANG
    Route.resource('page-admin/quan-ly-nhap-hang', 'PhieunhapsController')

    // ROUTE NHA CUNG CAP
    Route.resource('page-admin/quan-ly-nha-cung-cap', 'NhaCungCapsController')

    // ROUTER QUAN LY KHO
    Route.resource('page-admin/quan-ly-kho', 'QuanlykhosContronller')

    // ROUTER ADMIN
    // LOAI SAN PHAM
    Route.post('page-admin/loai-san-pham/deletelsp/:id', 'LoaiSanPhamsController.deleteLoaiSanPham')

    Route.post('page-admin/loai-san-pham/updatelsp/:id', 'LoaiSanPhamsController.updateLoaiSanPham')

    Route.post('page-admin/loai-san-pham/revertlsp/:id', 'LoaiSanPhamsController.revertLoaiSanPham')

    // SAN PHAM
    Route.post('page-admin/san-pham/deletesp/:id', 'SanPhamsController.deleteSanPham')
    Route.post('page-admin/san-pham/revertsp/:id', 'SanPhamsController.kinhDoanhSanPham')
    Route.post('page-admin/san-pham/khuyenmai/:id', 'SanPhamsController.themKhuyenMai')
    Route.post('page-admin/san-pham/hetkhuyenmai/:id', 'SanPhamsController.hetKhuyenMai')
    Route.post('page-admin/san-pham/update/:id', 'SanPhamsController.updateSanPham')
    Route.post('page-admin/san-pham/kinhdoanh/:id', 'SanPhamsController.kinhDoanh')

    // NHA CUNG CAP 
    Route.post('page-admin/quan-ly-nha-cung-cap/update/:id', 'NhaCungCapsController.updateNCC')
    Route.post('page-admin/quan-ly-nha-cung-cap/delete/:id', 'NhaCungCapsController.deleteNCC')
    Route.post('page-admin/quan-ly-nha-cung-cap/revert/:id', 'NhaCungCapsController.revertNCC')

    // KHÁCH HÀNG
    Route.post('page-admin/khach-hang/edit/:id', 'DoiTuongsController.editDoiTuong')
    Route.post('page-admin/khach-hang/delete/:id', 'DoiTuongsController.deleteDoiTuong')
    Route.post('page-admin/khach-hang/revert/:id', 'DoiTuongsController.revertDoiTuong')

    // PHIEU NHAP 


}).middleware(['auth', 'role:admin'])




