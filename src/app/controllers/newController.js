

class NewsController {
    //get news
    index(req, res) {
        res.render('shop/contact');
    }
    
    // Plus(req, res, next){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
    //     cart.plusByOne(productId);
    //     req.session.cart = cart;
    //     res.redirect('/courses/show')
    // } 
    // Minus(req, res, next){
    //     var productId = req.params.id;
    //     var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        
    //     cart.reduceByOne(productId);
    //     req.session.cart = cart;
    //     res.redirect('/courses/show')
    // } 
    //Get /news/:slug
    // show(req, res) {
    //     res.send('New detail');
    // }
}
module.exports = new NewsController();
