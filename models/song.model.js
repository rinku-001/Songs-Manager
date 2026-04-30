const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName:{type:String,required:true,trim:true},
    duration:{type:Number,required:true},
    singer:{type:String,required:true,trim:true}
},{timestamps:true});

module.exports = mongoose.model('Song',songSchema);