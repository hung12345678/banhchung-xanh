module.exports ={
    //nhieu document
    mutipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map(mongoose => mongoose.toObject());
    },
    // 1 document
    mongooseToObject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};