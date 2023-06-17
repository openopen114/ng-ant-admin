import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DwService } from '@services/api/dw.service';

@Component({
  selector: 'app-dw',
  templateUrl: './dw.component.html',
  styleUrls: ['./dw.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DwComponent {

  constructor(public dwService: DwService) { }




  /**
   * 
   * 測試只有管理者角色能拿到資料
   *  
   */
  getOnlyRollAdminData() {
    console.log('===> DwComponent  測試只有管理者角色能拿到資料')
    //http://localhost:8090/test-walsin-iscm-be-service/auth/only-roll-admin
    this.dwService.getOnlyRollAdminData().subscribe(res => {
      console.log('測試只有管理者角色能拿到資料 --> 拿到資料了', res)
    }, err => {
      console.log('測試只有管理者角色能拿到資料 --> 拿資料失敗了', err)
    })

  }
}
