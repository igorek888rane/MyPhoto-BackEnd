const {Schema, model} = require('mongoose');


const PhotoCardSchema = new Schema({
    id:{type:Number,unique:true,required:true},
    photoUrl:{type:String,required:true},
    description:{type:String},
    likes:{type:Number,default:0},
    comments:{type:Number,default:0},
})

module.exports = model('PhotoCard', PhotoCardSchema);