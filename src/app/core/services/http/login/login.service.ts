import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';

export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: BaseHttpService,
    // @Inject(MENU_TOKEN) public menus: Menu[],
    private menuService: MenusService
  ) { }


  /**
   * 
   * 登录請求
   *  
   */
  public login(params: UserLogin): Observable<string> {
    console.log('===> LoginService  登录請求')
    // http://localhost:8090/test-walsin-iscm-be-service/auth/login
    return this.http.post('/auth/login', params, { needSuccessInfo: false });
  }

  /**
   *  
   * 
   * 通过用户Id来获取菜单数组 
   */
  public getMenuByUserId(): Observable<string> {
    console.log('===>  LoginService 通过用户Id来获取菜单数组 ')
    // 如果是静态菜单，就把下面注释放开
    // return of(this.menus); 
    return this.http.post('/auth/menu', null, { needSuccessInfo: false });
  }
}
