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


// startup
src/app/core/startup/startup.service.ts



//TODO待確認
// 将 token 持久化缓存，请注意，如果没有缓存，则会在路由守卫中被拦截，不让路由跳转
// 这个路由守卫在src/app/core/services/common/guard/judgeLogin.guard.ts


    // todo 登录后台返回统一模式为,如果code不为0，会自动被拦截，如果需要修改，请在src/app/core/services/http/base-http.service.ts中进行修改
    // {
    //   code:number,
    //   data:any,
    //   msg：string
    // }



    {
  "userId": 1,
  "rol": "default:level:menu1:menu1-1,default:system:dept,default:page-demo:list,default:page-demo:list:tree-list,default:feat:frame:zorro-doc,default:system,default:feat:session-timeout,default:comp:transition,default:page-demo:except:network-error,default:feat:frame,default:page-demo:result:success,default:dashboard:workbench,default:comp:lazy:lazy-basic,default:comp:lazy,blank:empty-page,default:level:menu2,default:feat:charts:baidu-map,default:level:menu1,default:feat:full-screen,default:feat:download,default:page-demo:except:except500,default:page-demo:list:standard-table,default:dashboard:analysis,default:page-demo,default:comp:luckysheet,default:system:menu:add,default:comp:desc,default:system:account:edit,default:system:account:add,default:page-demo:except,default:page-demo:detail,default:level:menu1:menu1-2,default:comp:form,default:comp:form:shrink-form,default:page-demo:except:no-data,default:page-demo:list:card-table,https://github.com/huajian123/ng-ant-admin,default:comp:strength-meter,default:page-demo:flow:flow-chat,default:page-demo:form:step-form,default:page-demo:personal:personal-center,default:feat:upload,default:about,default:level:menu1:menu1-1:menu1-1-1,default:system:dept:add,default:feat:websocket,default:system:dept:edit,default:level:menu1:menu1-1:menu1-1-2,default:system:role-manager:add,default:feat:color-sel,default:feat:charts,default:page-demo:flow,default:system:role-manager:set-role,default:page-demo:list:search-list:project,default:comp,default:feat:charts:gaode-map,default:system:role-manager,default:system:account,default:page-demo:list:search-list:article,default:feat:setup,default:comp:lazy:lazy-scroll,default:feat:scroll:keep-scroll-page,default:system:account:del,default:dashboard,blank:other-login:login1,default:feat:charts:echarts,default:feat:icons,default:comp:form:append-form,default:system:menu:del,default:page-demo:personal:personal-setting,default:comp:basic,default:page-demo:detail:adv-detail,default:page-demo:result:fail,default:feat:context-menu,default:page-demo:list:search-list:application,default:system:role-manager:edit,default:feat:msg,blank:other-login,default:page-demo:detail:base-detail,default:system:menu:edit,default:feat:scroll:play-scroll,default:feat:click-out-side,default:system:role-manager:del,default:page-demo:form:advanced-form,default:page-demo:personal,default:feat:copy,default:dashboard:monitor,default:feat:ex-drawer,default:feat:rich-text,default:level,default:page-demo:form,default:feat,default:feat:img-preview,default:page-demo:list:search-list,default:page-demo:except:except403,default:system:menu,default:feat:tabs,default:page-demo:result,default:feat:ex-modal,default:system:menu:addlowlevel,default:system:dept:del,default:page-demo:list:search-table,default:page-demo:except:except404,default:feat:scroll,default:system:dept:addlowlevel,default:feat:ripple,default:page-demo:form:base-form",
  "iss": "echisan",
  "sub": "admin",
  "iat": 1686820859
}