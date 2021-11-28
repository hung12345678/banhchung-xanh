// const Course = require('../models/Course');
const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose');
class AdminController {
    // get news
    index(req, res, next) {
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
                res.render('admin/admin',{
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
        
    //    res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}
module.exports = new AdminController();
