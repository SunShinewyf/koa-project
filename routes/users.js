const router = require('koa-router')()
const validator = require('validator')
var User = require('../models/user')
var db = require('../libs/db')
const crypto = require('crypto')
router.prefix('/users')

router.get('/', async (ctx, next) => {
   await ctx.render('users/index',{
     title:'用户中心'
   })
})

router.get('/register', async (ctx, next) => {
    await ctx.render('users/register',{
      title:'用户注册'
    })
})

router.get('/login',async (ctx,next) => {
   await ctx.render('users/login',{
     title:'用户登录'
   })
})

router.get('/setting',async (ctx,next) => {
   await ctx.render('users/setting',{
     title: '用户设置'
   })
})

//注册页面的表单提交
router.post('/register',async (ctx,next) =>{
   let body = ctx.request.body;
   if(!validator.isEmail(body.email)){
      await ctx.render('users/register',{
         title:'用户注册',
         message:'邮箱格式不正确',
         error:true
      })
      return
   }
   if(!body.username || !body.psw || !body.email){
       await ctx.render('users/register',{
         title:'用户注册',
         message:'缺少应填的字段，请填写完整!',
         error:true
      })
      return
   }
   if(body.psw != body.repsw){
       await ctx.render('users/register',{
         title:'用户注册',
         message:'两次密码输入不一致，请重新填写!',
         error:true
      })
      return
   }
   
   //看该用户是否已经注册过
   let user = await User.findOne({
      email:body.email
   });
  
   if(user){
        await ctx.render('users/register',{
            title:'用户注册',
            message:'该邮箱已经注册过了!',
            error:true
        })
        //这句必须加上，否则的话即使后面有重复邮箱注册的时候也会执行后面的逻辑
        return
   }

   let md5 = crypto.createHash('md5');
   let password = md5.update(body.psw).digest('base64');
   let newUser = new User({
     username:body.username,
     password: password,
     email:body.email,
   })
   //将新用户存入数据库
   let result = await newUser.save();
   if(result){
     await ctx.render('users/login',{
         title:'用户登录',
         message:'注册成功!',
         success:true
     });
   }else{
     await ctx.render('users/register',{
         title:'用户注册',
         message:'注册失败!',
         error:true
     });
   }


})

//登录页面的表单提交
router.post('/login',async (ctx,next) => {
  let body = ctx.request.body;
  console.log(body,'oooo')
  if(!body.email || !body.psw){
     await ctx.render('users/login',{
        title: '用户登录',
        message:'请填写登录邮箱或密码',
        error:true
     })
     return
  }

  let user = await User.findOne({
      email:body.email
  });

  let md5 = crypto.createHash('md5');
  let newPassword = md5.update(body.psw).digest('base64');
  console.log(user.password,newPassword,'uuuu')
  if(!user){
     await ctx.render('users/login',{
       title:'用户登录',
       message:'用户不存在',
       error:true
     })
     return
  }else if(user.password != newPassword){
      await ctx.render('users/login',{
        title:'用户登录',
        message:'密码错误',
        error:true
      })
      return
  }else{
      await ctx.render('',{
       title:'简易论坛系统',
       message:'登录成功',
       success:true
     })
  }
})

module.exports = router
