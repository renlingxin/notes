// koa-session

const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
 
app.keys = ['some secret hurr'];
 
const CONFIG = {

  key: 'koa:sess', /** （字符串）cookie密钥（默认为koa：sess） */
  /** （数字||'会话'）maxAge以毫秒为单位（默认为1天）*/
  /** 'session'将导致cookie在会话/浏览器关闭时到期  */
  /** 警告：如果会话cookie被盗，此cookie将永不过期  */
  maxAge: 86400000,
  autoCommit: true, /** （boolean）自动提交头文件（默认为true） */
  overwrite: true, /**（boolean）可以覆盖或不覆盖（默认为true） */
  httpOnly: true, /** （boolean）httpOnly与否（默认为true）*/
  signed: true, /** （boolean）是否签名（默认为true） */
  rolling: false, /** （boolean）强制在每个响应上设置会话标识符cookie。到期时间重置为原始maxAge，重置到期倒计时。（默认为false） */
  renew: false, /**（boolean）更新会话，因此我们可以始终保持用户登录。（默认为false）*/
};
 
app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));
 
app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
 
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});
 
app.listen(3000);
console.log('listening on port 3000');