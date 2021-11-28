const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const OrderSchema = new Schema({
    // user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    sdt: {type: Number, required: true},

}, {
  timestamps: true,
});
module.exports = mongoose.model('Order', OrderSchema)

