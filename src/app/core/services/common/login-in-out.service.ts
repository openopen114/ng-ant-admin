import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@config/actionCode';
import { TokenKey, TokenPre } from '@config/constant';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { TabService } from '@core/services/common/tab.service';
import { WindowService } from '@core/services/common/window.service';
import { Menu } from '@core/services/types';
import { LoginService } from '@services/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { UserInfo, UserInfoService } from '@store/common-store/userInfo.service';
import { fnFlatDataHasParentToTree } from '@utils/treeTableTools';
import { log } from '@antv/g2plot/lib/utils';


/*
 * 退出登录
 * */
@Injectable({
  providedIn: 'root'
})
export class LoginInOutService {
  destroyRef = inject(DestroyRef);

  constructor(
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private loginService: LoginService,
    private router: Router,
    private userInfoService: UserInfoService,
    private menuService: MenuStoreService,
    private windowServe: WindowService
  ) { }

  // 通过用户Id来获取菜单数组
  getMenuByUserId(): Observable<string> {
    console.log('===@@ f getMenuByUserId')
    return this.loginService.getMenuByUserId();
  }




  loginIn(token: string): Promise<void> {
    return new Promise(resolve => {
      // 将 token 持久化缓存，请注意，如果没有缓存，则会在路由守卫中被拦截，不让路由跳转
      // 这个路由守卫在src/app/core/services/common/guard/judgeLogin.guard.ts

      // angular中使用md5密码加密
      // ref: https://github.com/cotag/ts-md5 



      // jwt token 存 localStorage  ECC_Authorization
      this.windowServe.setLocalStorage(TokenKey, TokenPre + token);


      // this.windowServe.setSessionStorage(TokenKey, TokenPre + token);
      // 解析token ，然后获取用户信息
      const userInfo: UserInfo = this.userInfoService.parsToken(TokenPre + token);
      // todo  这里是手动添加静态页面标签页操作中打开详情的按钮的权限，因为他们涉及到路由跳转，会走路由守卫，但是权限又没有通过后端管理，所以下面两行手动添加权限，实际操作中可以删除下面2行
      // TODO: 確認 ActionCode.TabsDetail 用途
      userInfo.authCode.push(ActionCode.TabsDetail);
      userInfo.authCode.push(ActionCode.SearchTableDetail);
      // 将用户信息缓存到全局service中
      this.userInfoService.setUserInfo(userInfo);
      console.log("🚀 ~ file: login-in-out.service.ts:69 ~ LoginInOutService ~ loginIn ~ userInfo:", userInfo)
      // 通过用户id来获取这个用户所拥有的menu

      console.log('通过用户id来获取这个用户所拥有的menu')

      this.getMenuByUserId()
        .pipe(
          finalize(() => {
            resolve();
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(menusJsonStr => {

          let menus: Menu[] = JSON.parse(menusJsonStr);

          console.log('菜單 menus')
          console.log(menus)

          menus = menus.filter(item => {
            item.selected = false;
            item.open = false;
            return item.menuType === 'C';
          });



          const temp = fnFlatDataHasParentToTree(menus);
          // 存储menu

          console.log('===> 存储menu temp', temp);


          this.menuService.setMenuArrayStore(temp);

          resolve();

        });

    });
  }

  // 清除Tab缓存,是与路由复用相关的东西
  clearTabCash(): Promise<void> {
    return SimpleReuseStrategy.deleteAllRouteSnapshot(this.activatedRoute.snapshot).then(() => {
      return new Promise(resolve => {
        // 清空tab
        this.tabService.clearTabs();
        resolve();
      });
    });
  }

  clearSessionCash(): Promise<void> {
    return new Promise(resolve => {
      this.windowServe.removeLocalStorage(TokenKey);
      this.menuService.setMenuArrayStore([]);
      resolve();
    });
  }

  loginOut(): Promise<void> {
    return this.clearTabCash()
      .then(() => {
        return this.clearSessionCash();
      })
      .then(() => {
        this.router.navigate(['/login/login-form']);
      });
  }
}
