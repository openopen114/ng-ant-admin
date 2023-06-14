import { Injectable } from '@angular/core';

import { TokenKey, TokenPre } from '@config/constant';
import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { UserInfoService } from '@store/common-store/userInfo.service';

import { WindowService } from '../services/common/window.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private userInfoService: UserInfoService, private loginInOutService: LoginInOutService, private windowSer: WindowService) { }

  load(): Promise<void> {
    const token = this.windowSer.getLocalStorage(TokenKey)?.replace(TokenPre, '');
    console.log("🚀 ~ file: startup.service.ts:17 ~ StartupService ~ load ~ token:", token);
    if (token) {
      return this.loginInOutService.loginIn(token);
    }
    return new Promise(resolve => {
      return resolve();
    });
  }
}
