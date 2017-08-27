const router = require('koa-router')()
const validator = require('validator');
var User = require('../models/user.js');

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

router.post('/register',async (ctx,next) =>{
   let body = ctx.request.body;
   console.log(validator.isEmail(body.email),'ooo')
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
   }
    
   let md5 = crypto.createHash('md5');
   let password = md5.update(body.psw).digest('base64');
   let newUser = new User({
     email:body.email,
     name:body.username,
     password: password
   })
  
   //将新用户存入数据库
   let result = await newUser.save();
   if(result){
     return ctx.success();
   }else{
     return ctx.error('注册失败');
   }


})

module.exports = router
