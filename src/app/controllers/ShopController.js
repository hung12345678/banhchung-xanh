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
                    '</td><td style="border: 1px solid black;">' + b.item.price + '.000 Vn??' +
                    '</td><td style="border: 1px solid black;">' + b.price + '.000 Vn??' +
                    '</td></tr>';
                }, '');
                  
                // console.log(content);
                // console.log(array);
                let mailOption = {
                    from: "thanhhung.it1993@gmail.com",
                    to: "nguyenlamtuyetnhu03@gmail.com",
                    subject: "Test Mail",
                    html: `<h2>????n H??ng C???a A.H??ng ???? ???????c T???o + M?? ????n H??ng: ` + result._id + `</h2>
                    <h3>Th???i gian t???o: `+ result.createdAt + ` </h3>
                    <h3>1. Th??ng Tin Kh??ch H??ng</h3>
                    <div>
                         <span style="font-weight: bold;">T??n kh??ch h??ng: <span style="color: red">`+ result.name + `</span></span>
                    </div>
    
                    <div>
                        <span style="font-weight: bold;">S??? ??i???n tho???i: <span style="color: red">`+ result.sdt + `</span></span>
                    </div>
    
                    <div>
                        <span style="font-weight: bold;" >?????a Ch???:   <span style="color: red">`+ result.address + `</span> </span>
                    </div>
                    <h3 class="text-about">2. Th??ng Tin ????n H??ng</h3>
                    <table style="text-align: center;"> 
                    <theah>
                        <tr>
                        <th style="border: 1px solid black;">T??n B??nh</th>
                        <th style="border: 1px solid black;">S??? L?????ng</th>
                        <th style="border: 1px solid black;">??V</th>
                        <th style="border: 1px solid black;">????n Gi??</th>
                        <th style="border: 1px solid black;">Th??nh Ti???n</th>
                        </tr>
                    </thead>
                    <tbody>
                        `+content+`
                    </tbody>
                    <table>
                    <div>
                        <h3 style="color:red">T???ng Ti???n: `+ result.cart.totalPrice + `.000 Vn?? </h3> 
    
                    </div> 
                     `,
                }
                // console.log(mailOption);




                transporter.sendMail(mailOption, function (err, success) {
                    if (err) {
                        console.log("L???i!!!")
                    }
                    else {
                        console.log("Email send success!!!")
                    }
                })

                req.flash('success', '????n h??ng ???? ???????c t???o! Oanh L??m s??? g???i li???n cho b???n nh?? ^^!');
                req.session.cart = null;
                res.redirect('/');

            })
        }, 3000);
    }
}
module.exports = new ShopController();
