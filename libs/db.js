const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const PostSchema = require('../models/post');

const db = mongoose.connect('mongodb://127.0.0.1:27017/easyClub');
db.connection.on("error",function(err){
    console.log('数据库连接失败:'+error);
});

db.connection.on("open",function(){
    console.log('数据库连接成功');
})