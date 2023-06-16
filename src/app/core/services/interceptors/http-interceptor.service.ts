import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { TokenKey } from '@config/constant';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';

import { WindowService } from '../common/window.service';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}



// http 攔截service

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private windowServe: WindowService, public message: NzMessageService) { }

  intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
    // token 改抓  localstorage
    const token = this.windowServe.getLocalStorage(TokenKey);
    let httpConfig: CustomHttpConfig = {};

    // 有 token 就加入 header Authorization: Bearer
    if (!!token) {
      console.log('==> 有 token 就加入 header Authorization: Bearer')
      // httpConfig = { headers: req.headers.set(TokenKey, token) };
      // 如果 TokenKey 不是 'Authorization' 就手動設定為 'Authorization'
      httpConfig = { headers: req.headers.set('Authorization', token) };
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(
      filter(e => e.type !== 0),
      catchError(error => this.handleError(error))
    );
  }

  // TODO: 待驗證有作用
  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    console.log("🚀 ~ file: http-interceptor.service.ts:46 ~ HttpInterceptorService ~ handleError ~ status:", status)
    let errMsg = '';
    if (status === 0) {
      errMsg = '網絡出現未知的錯誤，請檢查您的網絡。';
    }
    if (status >= 300 && status < 400) {
      errMsg = `請求被服務器重定向，狀態碼為${status}`;
    }
    if (status >= 400 && status < 500) {
      errMsg = `客戶端出錯，可能是發送的數據有誤，狀態碼為${status}`;
    }
    if (status >= 500) {
      errMsg = `服務器發生錯誤，狀態碼為${status}`;
    }
    return throwError({
      code: status,
      message: errMsg
    });
  }
}
