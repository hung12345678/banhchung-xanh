const session = require('express-session');
const { mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');
const Product = require('../models/Product');
const Cart = require('../models/cart');
const flash = require('connect-flash');
const Order = require('../models/order');
const nodemailer = require('nodemailer');
class ShopController {

    cart(req, res, next) {
        //    Promise.all([Course.findOne({}), Product.findOne({})])
        //         .then(([course, product]) =>  
        //             res.render('cart/cartMe', {
        //                 course: mongooseToObject(course),
        //                 product:  mongooseToObject(product)
        //         }))

        //         .catch(next);
        if (!req.session.cart) {
            return res.render('shop/shop-cart', { products: null })
        }
        var cart = new Cart(req.session.cart);
        res.render('shop/shop-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
        // console.log(this.item.name)

    }

    checkout(req, res, next) {
        if (!req.session.cart) {
            return res.redirect('shop/shop-cart')
        }
        var cart = new Cart(req.session.cart);
        var errMsg = req.flash('error')[0];
        res.render('shop/checkout', { products: cart.generateArray(), totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg })
    }
    post(req, res, next) {
        var successMsg = req.flash('success')
        if (!req.session.cart) {
            return res.redirect('shop/shop-cart')
        }
        var cart = new Cart(req.session.cart);
        var order = new Order({
            //  user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.fullname,
            sdt: req.body.sdt,

        })


        setTimeout(() => {
            order.save(function (err, result) {
                // console.log(key)
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "thanhhung.it1993@gmail.com",
                        pass: "P15110607h1993@",
                    },
                    tls: {
                        rejectUnAuthorcatized: false,
                    },
                })
                var array = [];
                var key = result.cart.items;
                for (var i in key) {
                    array.push(key[i])
                }
                var content = array.reduce(function(a, b) {
                    return a + '<tr><td style="border: 1px solid black;">' + b.item.name + 
                    '</td><td style="border: 1px solid black;">' + b.qty + 
                    '</td><td style="border: 1px solid black;">' + b.item.unit +
                    '</td><td style="border: 1px solid black;">' + b.item.price + '.000 Vnđ' +
                    '</td><td style="border: 1px solid black;">' + b.price + '.000 Vnđ' +
                    '</td></tr>';
                }, '');
                  
                // console.log(content);
                // console.log(array);
                let mailOption = {
                    from: "thanhhung.it1993@gmail.com",
                    to: "nguyenlamtuyetnhu03@gmail.com",
                    subject: "Test Mail",
                    html: `<h2>Đơn Hàng Của A.Hùng Đã Được Tạo + Mã Đơn Hàng: ` + result._id + `</h2>
                    <h3>Thời gian tạo: `+ result.createdAt + ` </h3>
                    <h3>1. Thông Tin Khách Hàng</h3>
                    <div>
                         <span style="font-weight: bold;">Tên khách hàng: <span style="color: red">`+ result.name + `</span></span>
                    </div>
    
                    <div>
                        <span style="font-weight: bold;">Số điện thoại: <span style="color: red">`+ result.sdt + `</span></span>
                    </div>
    
                    <div>
                        <span style="font-weight: bold;" >Địa Chỉ:   <span style="color: red">`+ result.address + `</span> </span>
                    </div>
                    <h3 class="text-about">2. Thông Tin Đơn Hàng</h3>
                    <table style="text-align: center;"> 
                    <theah>
                        <tr>
                        <th style="border: 1px solid black;">Tên Bánh</th>
                        <th style="border: 1px solid black;">Số Lượng</th>
                        <th style="border: 1px solid black;">ĐV</th>
                        <th style="border: 1px solid black;">Đơn Giá</th>
                        <th style="border: 1px solid black;">Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        `+content+`
                    </tbody>
                    <table>
                    <div>
                        <h3 style="color:red">Tổng Tiền: `+ result.cart.totalPrice + `.000 Vnđ </h3> 
    
                    </div> 
                     `,
                }
                // console.log(mailOption);




                // transporter.sendMail(mailOption, function (err, success) {
                //     if (err) {
                //         console.log("Lỗi!!!")
                //     }
                //     else {
                //         console.log("Email send success!!!")
                //     }
                // })

                req.flash('success', 'Đơn hàng đã được tạo! Oanh Lâm sẽ gọi liền cho bạn nhé ^^!');
                req.session.cart = null;
                res.redirect('/');

            })
        }, 3000);
    }
}
module.exports = new ShopController();