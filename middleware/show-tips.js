/**
 * desc:显示提示的中间件（成功和失败信息提示）
 * author:SunShinewyf
 * date:2017-08-27
 */

 function showTips(ctx,status){
    return async (msg,obj) =>{
        obj = obj || new Object;
        if(typeof(msg) == 'string'){
            obj.tip = msg;
        } 
        obj.status = status;
        return await ctx.render('show-tips',{
            obj
        })
    }
 }


 module.exports = function(){
     return async(ctx,next) => {
        if(!ctx.success){
            ctx.success = showTips(ctx,1);
        }
        if(!ctx.error){
            ctx.error = showTips(ctx,0);
        }
        if(next){
           await next();
        }
     }
 }