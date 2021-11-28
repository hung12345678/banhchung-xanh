// const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');
const User = require('../models/user');

class UserController {
    //get me/store/courses
    singin(req, res, next) {
       res.render('user/singin', {csrfToken: req.csrfToken()})
    }
    admin(req, res, next) {
        res.redirect('/admin/admin')
    }
  
}
module.exports = new UserController();
