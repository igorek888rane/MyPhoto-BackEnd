const {Schema, model} = require('mongoose');



const UserSchema = new Schema({
    email:{type:String,unique:true,required:true},
    userName:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    userStatus:{type:String,required:true,default: ''},
    userAvatar:{type:String,required:true,default: ''},
    isActivated:{type:Boolean,default:false},
    activationLink:{type:String},
    photoCard:{ref:'PhotoCard',default:[]},
})

module.exports = model('User', UserSchema);