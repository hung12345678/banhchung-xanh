const newRouter = require('./news');
const siteRouter = require('./sites');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const cartRouter = require('./cart');
const userRouter = require('./user');
const adminRouter = require('./admin');
const shopRouter = require('./shop');
const express = require('express');

function route(app) {
    app.use('/me', meRouter)
    app.use('/shop', newRouter);
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
    app.use('/add-to-cart', cartRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/shop', shopRouter);
    //   app.get('/news', (req, res) => {
    //     res.render('news');
    //   });

    // app.post('/search', (req, res) => {
    //     res.send('');
    // });

    // app.get('/search', (req, res) => {
    //     res.render('search');
    // });
}

module.exports = route;
