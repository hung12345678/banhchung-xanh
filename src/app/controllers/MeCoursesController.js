// const Course = require('../models/Course');
const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const Order = require('../models/order');
const Cart = require('../models/cart')
class MeCoursesController {
    //get me/store/courses
    store(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>  res.render('store/courses', {
                deleteCount,
                courses: mutipleMongooseToObject(courses),
            }))
            .catch(next);
    //     Course.countDocumentsDeleted()
    //         .then((deleteCount) => {
    //             console.log(deleteCount)
    //         })
    //         .catch(() => {})

    //     //Lấy dữ liệu trên db
    //    Course.find({ })
    //         .then(courses =>  res.render('store/courses', {
    //             courses: mutipleMongooseToObject(courses),
    //         }))
    //         .catch(next);
    }
    order(req, res, next) {
        //xử lý lưu dữ liệu
        // res.json(req.body);
        Order.find({}).sort({"createdAt": -1})
        .then(orders => {
            res.render('store/order',{
                orders: mutipleMongooseToObject(orders),
            });
            
        })
        .catch(next);
    
    }
    orderdetail(req, res, next) {
        //xử lý lưu dữ liệu
        // res.json(req.body);
       Order.find()
    
    }
    
    
    //get me/RecycleBinstore/courses
    RecycleBinstore(req, res, next){
        // FINDELEE LẤY RA NHỮNG KHÓA HỌC ĐÃ XÓA
        Course.findDeleted({ })
        .then(courses =>  res.render('store/RecycleBin', {
            courses: mutipleMongooseToObject(courses),
        
        }))
        .catch(next);
    }
 
  
}
module.exports = new MeCoursesController();
