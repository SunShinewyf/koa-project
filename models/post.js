/**
 * author:sunshinewyf
 * date:2017-07-12
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const path = require('path')

const postSchema = new mongoose({
    title:{type:String,required:true},
    content:{type:String,required:true},
    author_id:{type:ObjectId,required:true},
    reply_count:{type:Number,default:0},
    tag:{type:String,required:true},
    create_time:{type:Date,default:Date.now()},
    update_time:{type:Date,default:Date.now()},
    top:{type:Boolean,default:false}, //是否是置顶帖子
    good:{type:Boolean,default:false} //是否是精华帖子
})

const Post = mongoose.model(postSchema)
module.exports = Post