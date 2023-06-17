import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BaseHttpService } from '@services/base-http.service';
@Injectable({
  providedIn: 'root'
})
export class DwService {

  constructor(public http: BaseHttpService,) { }




  /**
   * 
   * 測試只有管理者角色能拿到資料
   *  
   */
  public getOnlyRollAdminData(): Observable<string> {
    console.log('===> BaseHttpService  測試只有管理者角色能拿到資料')
    // http://localhost:8090/test-walsin-iscm-be-service/auth/only-roll-admin
    return this.http.post('/auth/only-roll-admin', null, { needSuccessInfo: false });
  }
}
