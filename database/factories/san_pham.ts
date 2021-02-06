// import Factory from '@ioc:Adonis/Lucid/Factory'
// import sanpham from 'App/Models/Sanpham'
// import loaisanpham from 'App//Models/Loaisanpham'


// export const loaisanphamFactory = Factory
//     .define(loaisanpham, ({faker}) =>{
//         return{
//             tenloaisanpham: faker.lorem.sentence(),
//             hinhanhloaisanpham: faker.lorem.sentence()
//         }
// })
// .build()

// export const sanphamFactory = Factory
//     .define(sanpham, ({faker}) =>{
//         return{
//             tensanpham: faker.lorem.sentence(),
//             giaban: faker.lorem.sentences(),
//             hinhanh: faker.lorem.sentences(),
//             khuyenmai:faker.lorem.sentences(),
//             trangthai:faker.lorem.sentences()   
//         }
//     })
//     .relation('loaisanpham', ()=> loaisanphamFactory )
//     .build()
