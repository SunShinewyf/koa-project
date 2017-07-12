/**
 * author:sunshinewyf
 * date:2017-07-12
 */
const mongoose = require('mongoose')
const crypto = require('crypto')
const path = require('path')

var userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    avatar:{type:String}, //头像
    github:{type:String}, //github地址
    scroe:{type:Number, default:0}, //个人积分
    signature:{type:String,default:'这家伙很懒，什么个性签名都没有留下'},
    topic:{type:Number, default:0},
    reply:{type:Number, default:0},
    create_time:{type:String, default:Data.now()}
})

var User = mongoose.model('User',userSchema)
module.exports = User