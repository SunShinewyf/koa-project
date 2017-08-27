const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2")
const router = require('koa-router')()

const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')
const posts = require('./routes/posts')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(session({
    key: "SESSIONID",   //default "koa:sess"
    maxAge: 5000  //设置session超时时间
}))

app.use(views(__dirname + '/views', {
  extension: 'nunjucks'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(posts.routes(), posts.allowedMethods())
app.use(router.routes(), router.allowedMethods());

module.exports = app
