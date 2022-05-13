import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fnCheckForm} from '@utils/tools';
import {SpinService} from "@store/common-store/spin.service";
import {WindowService} from "@core/services/common/window.service";
import {LoginService} from "@core/services/http/login/login.service";
import {UserInfoService} from "@store/common-store/userInfo.service";
import {MenuStoreService} from "@store/common-store/menu-store.service";
import {LoginInOutService} from "@core/services/common/login-in-out.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private loginInOutService: LoginInOutService,
              private menuService: MenuStoreService,
              private dataService: LoginService,
              private spinService: SpinService,
              private windowServe: WindowService,
              private userInfoService: UserInfoService,
              private router: Router) {
  }

  submitForm(): void {
    // 校验表单
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    // 设置全局loading
    this.spinService.setCurrentGlobalSpinStore(true);
    // 获取表单的值
    const param = this.validateForm.getRawValue();
    // 调用登录接口
    // 登录后台返回统一模式为,如果code不为0，会自动被拦截，如果需要修改，请在src/app/core/services/http/base-http.service.ts中进行修改
    // {
    //   code:number,
    //   data:any,
    //   msg：string
    // }
    this.dataService.login(param).pipe(finalize(()=>{
      this.spinService.setCurrentGlobalSpinStore(false);
    })).subscribe(userToken => {
      this.loginInOutService.loginIn(userToken).then(() => {
        this.router.navigateByUrl('default/dashboard/analysis');
      }).finally(()=>{
        this.spinService.setCurrentGlobalSpinStore(false);
      })
    })
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }

}
