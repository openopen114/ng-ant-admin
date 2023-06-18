import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import * as _ from 'lodash';

export interface UserInfo {
  userId: string;
  authCode: string[];
  userName?: string;
}




@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({ userId: '---', authCode: [] });

  constructor() { }

  parsToken(token: string): UserInfo {
    const helper = new JwtHelperService();
    try {
      const { rol, userId } = helper.decodeToken(token);
      const authCodeArr: any[] = [];

      rol.forEach((item: any) => {
        authCodeArr.push(_.get(item, 'authority'));
      })

      console.log("====> UserInfoService")
      console.log("🚀 ~ file: userInfo.service.ts:23 ~ UserInfoService ~ parsToken ~ rol:", rol)
      console.log("🚀 ~ file: userInfo.service.ts:23 ~ UserInfoService ~ parsToken ~ userId:", userId)
      console.log('authCodeArr')
      console.log(authCodeArr);




      return {
        userId,
        authCode: authCodeArr
      };
    } catch (e) {
      return {
        userId: '---',
        authCode: []
      };
    }
  }

  setUserInfo(userInfo: UserInfo): void {
    console.log("===> setUserInfo userInfo")
    console.log(userInfo)
    this.userInfo$.next(userInfo);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
