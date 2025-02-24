const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const courseSchema = new mongoose.Schema({
    courseName : {type: String,required : true, unique : true},
    category : {type:String,required : true},
    description : {type: String},
    price : {type: Number,required:true},
    toalRevenue : {type : Number, default:0},
    owner : {type : mongoose.Schema.Types.ObjectId, ref :'User'},
    reveiw: [{msg: { type: String },owner : {type : mongoose.Schema.Types.ObjectId, ref :'User'}}],
    buyers : [{type: mongoose.Schema.Types.ObjectId,ref :'User'}],
    data: [{
        title : {type:String, required:true},
        passage: {type:String, required:true},
    }]
},{timestamps:true});


module.exports = mongoose.model('Course',courseSchema);