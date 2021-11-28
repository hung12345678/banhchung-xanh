// const Course = require('../models/Course');
const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose');
class NewsController {
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
        var successMsg = req.flash('success')[0]
        Course.find({})
            .then(courses => {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses),
                    successMsg: successMsg,
                    noMessages: !successMsg,
                });
            })
            .catch(next);
        
    //    res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}
module.exports = new NewsController();
