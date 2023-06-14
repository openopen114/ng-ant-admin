import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserInfoService } from '@store/common-store/userInfo.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  codeArray!: string[];

  @Input('appAuth')
  set appAuth(authCode: string | undefined) {
    if (!authCode) {
      this.show(true);
      return;
    }

    console.log('===> 檢查 appAuth: ' + authCode);
    console.log('this.codeArray.includes(authCode) :' + this.codeArray.includes(authCode))

    this.codeArray.includes(authCode) ? this.show(true) : this.show(false);
  }

  constructor(private userInfoService: UserInfoService, private templateRef: TemplateRef<NzSafeAny>, private viewContainerRef: ViewContainerRef) {
    this.userInfoService.getUserInfo().subscribe(userInfo => {
      // TODO:   user 的 code(authCode)  array
      this.codeArray = userInfo.authCode;
    });
  }

  private show(hasAuth: boolean): void {
    hasAuth ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }
}
