const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coure = require('../models/Course')

// var abc = Coure.aggregate([{
//   $lookup: {
//       from: "product",
//       localField: "product_id",
//       foreignField: "_id",
//       as: "name"
//   }
// }])
const Product = new Schema({
    //bắt buộc nhập name
    Quantity: {type: Number},
    Totalmoney: {type: Number},
    price: {type: Number},
  },{
    timestamps: true,
  });
const newProduct = mongoose.model('Product', Product, 'product')

module.exports = newProduct;

