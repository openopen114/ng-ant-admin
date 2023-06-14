===== 只是一些筆記可跳過 =====

// tsconfig.json > compilerOptions > path  定義縮路徑寫


登入頁 login page
src/app/pages/login/login-form


登入驗證
src/app/core/services/http/login/login.service.ts

登入登出
src/app/core/services/common/login-in-out.service.ts


   // 将 token 持久化缓存，请注意，如果没有缓存，则会在路由守卫中被拦截，不让路由跳转
      // 这个路由守卫在src/app/core/services/common/guard/judgeLogin.guard.ts
