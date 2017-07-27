const router = require('koa-router')()

router.prefix('/posts')

router.get('/',async (ctx,next) =>{
    await ctx.render('posts/index',{
        title:'帖子列表'
    })
})


router.get('/write',async (ctx,next) =>{
    await ctx.render('posts/write',{
        title:'发表帖子'
    })
})

module.exports = router