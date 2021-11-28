// const Course = require('../models/Course');
const session = require('express-session');
const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Cart = require('../models/cart');
const Product = require('../models/Product');
class courseController {
  
    // [get] /course/create
   

    product(req, res, next) {
        //từ controller tương tác với model là đây
        // Course.find({}, function(err, courses){
        //     if (!err) {
        //         res.json(courses);
        //     }
        //     else{
        //         next(err);
        //     }
        // });
        Course.find({})
            .then(courses => {
                res.render('courses/products',{
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
        
    //    res.render('home');
    }
    // [get] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }
   

    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /course/store:  gửi yêu cầu thêm dữ liệu
    store(req, res, next) {
        //xử lý lưu dữ liệu
        // res.json(req.body);
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/store/courses'))
            .catch(error => {

            });
    }
    
    // [get] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }
    // [PUT] /course/:id
    update(req, res, next) {
        //    res.json(req.body)
        Course.updateOne({ _id: req.params.id }, req.body)
            // redirect thêm key location trả về location me/store/courses tra network sẽ thấy
            .then(() => res.redirect('/me/store/courses'))
            .catch(next)
    }
    // [DELETE] /course/:id
    delete(req, res, next) {
        // sử dụng delete của mongooes để soft delete sử dụng deleteone để xóa thạt
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[patch] /course/:id/restore
    restore(req, res, next) {
        // sử dụng delete của mongooes để soft delete sử dụng deleteone để xóa thạt
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[delete] /course/:id/delete-Forever
    deleteForever(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // Get, Post, Put, Patch, Delete, 
    // Minus(req, res, next){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
    //     cart.reduceByOne(productId);
    //     req.session.cart = cart;
    //     res.redirect('/courses/show')
    // } 

    // Plus(req, res, next){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
    //     cart.plusByOne(productId);
    //     req.session.cart = cart;
    //     res.redirect('/courses/show')
    // } 
  
}
module.exports = new courseController();
