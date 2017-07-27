const router = require('koa-router')()

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

module.exports = router
