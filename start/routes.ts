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
import HomeController from 'App/Controllers/Http/HomeController'

Route.group(() => {
    Route.get('/register', 'homeController.viewregister')
    Route.post('/register', 'homeController.postregister')

})
Route.get('/login', 'homeController.viewlogin')
Route.post('/login', 'homeController.postlogin')
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

    // ROUTER DANH MỤC
    Route.get('/danh-muc/loai-san-pham', 'productsController.viewLoaiSanPham')
    Route.post('/product/them-loai-product', 'productsController.themLoaiSanPham')
    Route.get('/danh-muc/doi-tuong', 'productsController.viewDoiTuong')

    // ROUTER SAN PHAM THEO DOI TUONG
    Route.post('/product/them-loai-nguoi-mua', 'productsController.themloainguoimua')


})

// ROUTER ADMIN
Route.group(() => {

    Route.get('page-admin/login-page-admin', 'AdminsController.viewloginPageAdmin')
    Route.get('/page-admin', 'adminsController.homeAdmin')
    Route.get('/page-admin/san-pham/them-moi', 'productsController.formThem')
    Route.get('/page-admin/san-pham', 'ProductsController.viewSanPham')
    Route.get('/page-admin/san-pham/khong-ban', 'productsController.viewTableDestroy')
    Route.get('/page-admin/manager-page', 'AdminsController.viewManager')
    Route.get('/page-admin/khach-hang', 'AdminsController.viewKhachHang')

    // POST
    Route.post('/page-admin/san-pham/them-moi', 'productsController.themSanPham')
    Route.post('/page-admin/login-page-admin', 'AdminsController.loginPageAdmin')


    // DELETE
    Route.post('/page-admin/san-pham/deletesp/:id', 'productsController.deleteSanPham') // Update trạng thái của sản phẩm
    Route.post('/page-admin/san-pham/revertsp/:id', 'productsController.revertSanPham')// Revert lại trạng thái sản phẩm
    Route.post('/page-admin/san-pham/deletelsp/:id', 'productsController.deleteLoaiSanPham')
    // UPDATE
    Route.post('/page-admin/san-pham/update/:id', 'productsController.updateSanPham')
    Route.post('/page-admin/san-pham/updatelsp/:id', 'productsController.updateLoaiSanPham')

})
// ROTER CART
Route.post('/cart', 'BillsController.addToCart')

Route.resource('/page-admin/loai-san-pham', 'LoaiSanPhamsController')


