const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const Course = new Schema({
  //bắt buộc nhập name
  name: { type: String, required: true },
  decripton: { type: String, maxlength: 600 },
  image: { type: String, maxlength: 600 },
  imageitem: { type: String, maxlength: 600 },
  imageitem1: { type: String, maxlength: 600 },
  imageitem2: { type: String, maxlength: 600 },
  imageitem3: { type: String, maxlength: 600 },
  imageitem4: { type: String, maxlength: 600 },
  videoId: { type: String, required: true },
  // createDAt: {type: Date, default: Date.now},
  // UpadateDAt: {type: Date, default: Date.now},
  price: { type: Number },
  unit: { type: String },
  qty: {type: Number},
  slug: { type: String, slug: 'name', unique: true },

}, {
  timestamps: true,
});

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});



module.exports = mongoose.model('Course', Course, 'course')