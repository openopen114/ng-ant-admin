===== 只是一些筆記可跳過 =====

// tsconfig.json > compilerOptions > path  定義縮路徑寫


登入頁 login page
src/app/pages/login/login-form


登入驗證
src/app/core/services/http/login/login.service.ts

登入登出
src/app/core/services/common/login-in-out.service.ts


// http 攔截器
src/app/core/services/interceptors/http-interceptor.service.ts


// 登录过期拦截
src/app/core/services/interceptors/login-expired.service.ts


// http  proxy
proxy.conf.json



//TODO待確認
// 将 token 持久化缓存，请注意，如果没有缓存，则会在路由守卫中被拦截，不让路由跳转
// 这个路由守卫在src/app/core/services/common/guard/judgeLogin.guard.ts


    // todo 登录后台返回统一模式为,如果code不为0，会自动被拦截，如果需要修改，请在src/app/core/services/http/base-http.service.ts中进行修改
    // {
    //   code:number,
    //   data:any,
    //   msg：string
    // }