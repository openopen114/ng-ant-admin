import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DwService } from '@services/api/dw.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dw',
  templateUrl: './dw.component.html',
  styleUrls: ['./dw.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, RouterOutlet]
})
export class DwComponent {
  constructor(public dwService: DwService, public message: NzMessageService) { }

  /**
   *
   * 測試只有管理者角色能拿到資料
   *
   */
  getOnlyRollAdminData() {
    console.log('===> DwComponent  測試只有管理者角色能拿到資料');
    //http://localhost:8090/test-walsin-iscm-be-service/auth/only-roll-admin
    this.dwService.getOnlyRollAdminData().subscribe(
      res => {
        console.log('測試只有管理者角色能拿到資料 --> 拿到資料了', res);
        this.message.success('測試只有管理者角色能拿到資料 --> 拿到資料了');
      },
      err => {
        console.log('測試只有管理者角色能拿到資料 --> 拿資料失敗了', err);
        this.message.error('測試只有管理者角色能拿到資料 --> 非管理者 拿資料失敗了');
      }
    );
  }
}
