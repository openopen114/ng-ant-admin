import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { LoginService } from '@core/services/http/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { TokenKey } from '@config/constant';

// MD5 
import { Md5 } from 'ts-md5';

import * as _ from 'lodash';





@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzTabsModule, NzGridModule, NzButtonModule, NzInputModule, NzWaveModule, NzCheckboxModule, NzIconModule, RouterLink]
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;
  destroyRef = inject(DestroyRef);
  constructor(
    private fb: FormBuilder,
    private loginInOutService: LoginInOutService,
    private menuService: MenuStoreService,
    private loginService: LoginService,
    private spinService: SpinService,
    private windowServe: WindowService,
    private userInfoService: UserInfoService,
    private router: Router
  ) { }

  submitForm(): void {
    // 校验表单
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();


    console.log('angular中使用md5密码加密')
    console.log(_.toUpper(Md5.hashStr('1111')));



    // 中冠前端密碼 MD5 加密, 轉大寫 後往後驗證
    // TODO:判斷是否為華新ID
    const { password } = param;
    const md5Password = Md5.hashStr(password);
    param.password = _.toUpper(md5Password);


    console.log('🚀 ~ file: login-form.component.ts:54 ~ LoginFormComponent ~ submitForm ~ param:', param);



    // 调用登录接口 
    console.log('调用登录接口');
    this.loginService
      .login(param)
      .pipe(
        // 无论如何设置全局loading为false
        finalize(() => {
          this.spinService.setCurrentGlobalSpinStore(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(userToken => {
        // 这里后台登录成功以后，只会返回一套由jwt加密的token，下面需要对token进行解析
        console.log('这里后台登录成功以后，只会返回一套由jwt加密的token，下面需要对token进行解析');
        // console.log('🚀 ~ file: login-form.component.ts:87 ~ LoginFormComponent ~ submitForm ~ userToken:', userToken);

        this.loginInOutService
          .loginIn(userToken)
          .then(() => {
            // 登入成功後 重新導向到預設頁面
            this.router.navigateByUrl('default/dashboard/analysis');
          })
          .finally(() => {
            this.spinService.setCurrentGlobalSpinStore(false);
          });
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });

    // 清掉 token
    this.windowServe.removeLocalStorage(TokenKey);
  }
}
