/**
 * author:sunshinewyf
 * date:2017-07-11
 */
const path = require('path')

const config = {
    //站点名字
    sitename:'简易前端社区',
    //站点模块
    tags:['全部','最新','提问','分享'],
    // 数据库连接
    mongodb: {
        user: '',
        pass: '',
        host: '127.0.0.1',
        port: 27017,
        database: 'frontCommunity',
    }
}

module.exports = config