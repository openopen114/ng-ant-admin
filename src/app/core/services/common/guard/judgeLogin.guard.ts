import { assertInInjectionContext, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

import { TokenKey } from '@config/constant';

import { WindowService } from '../window.service';

// 有兴趣的可以看看class与fn的争议https://github.com/angular/angular/pull/47924
// 我这里提供了跟judgeAuth.guard.ts的不同写法，供大家参考,也可以去官网查找mapToCanActivate 这个api，
// 路由守卫，没有TokenKey则跳转登录页
const canActivateChildFn: CanActivateFn = () => {
  // 这个方法可以检查inject是否在context中
  console.log('==> judge login canActivateChildFn 这个方法可以检查inject是否在context中');
  assertInInjectionContext(canActivateChildFn);
  const windowSrc = inject(WindowService);
  const router = inject(Router);

  const isLogin = !!windowSrc.getLocalStorage(TokenKey);
  console.log("🚀 ~ 这个方法可以检查inject是否在context中 file: judgeLogin.guard.ts:18 ~ isLogin:", isLogin)
  console.log("isLogin:" + isLogin)
  if (isLogin) {
    return true;
  }

  console.log('木有 isLogin ---> /login');

  return router.parseUrl('/login');
};

export const JudgeLoginGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return canActivateChildFn(childRoute, state);
};
