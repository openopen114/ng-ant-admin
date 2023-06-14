import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserInfo {
  userId: number;
  authCode: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({ userId: -1, authCode: [] });

  constructor() { }

  parsToken(token: string): UserInfo {
    const helper = new JwtHelperService();
    try {
      const { rol, userId } = helper.decodeToken(token);
      console.log("====> UserInfoService")
      console.log("🚀 ~ file: userInfo.service.ts:23 ~ UserInfoService ~ parsToken ~ rol:", rol)
      console.log("🚀 ~ file: userInfo.service.ts:23 ~ UserInfoService ~ parsToken ~ userId:", userId)



      return {
        userId,
        authCode: rol.split(',')
      };
    } catch (e) {
      return {
        userId: -1,
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
