import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as qs from 'qs';

// 取得 API 的基本路徑
import { getBaseApiUrl } from '@core/services/http/base-api-url';

export interface HttpCustomConfig {
  needSuccessInfo?: boolean; // 是否需要"操作成功"提示
  showLoading?: boolean; // 是否需要loading
  otherUrl?: boolean; // 是否是第三方接口
}

export interface ActionResult<T> {
  code: number;
  msg: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  uri: string;

  protected constructor(public http: HttpClient, public message: NzMessageService) {
    // TODO: 取得 API 的基本路徑
    this.uri = getBaseApiUrl();
    console.log('🚀 ~ file: base-http.service.ts:37 ~ BaseHttpService ~ constructor ~ uri:', this.uri);
  }

  get<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    console.log('===> http [GET]:' + path);
    config = config || { needSuccessInfo: false };
    let reqPath = this.getUrl(path, config);
    const params = new HttpParams({ fromString: qs.stringify(param) });
    return this.http.get<ActionResult<T>>(reqPath, { params }).pipe(this.resultHandle<T>(config));
  }

  delete<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.getUrl(path, config);
    const params = new HttpParams({ fromString: qs.stringify(param) });
    return this.http.delete<ActionResult<T>>(reqPath, { params }).pipe(this.resultHandle<T>(config));
  }

  post<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.getUrl(path, config);
    return this.http.post<ActionResult<T>>(reqPath, param).pipe(this.resultHandle<T>(config));
  }

  put<T>(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<T> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.getUrl(path, config);
    return this.http.put<ActionResult<T>>(reqPath, param).pipe(this.resultHandle<T>(config));
  }

  downLoadWithBlob(path: string, param?: NzSafeAny, config?: HttpCustomConfig): Observable<NzSafeAny> {
    config = config || { needSuccessInfo: false };
    let reqPath = this.getUrl(path, config);
    return this.http.post(reqPath, param, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getUrl(path: string, config: HttpCustomConfig): string {
    let reqPath = this.uri + path;
    if (config.otherUrl) {
      reqPath = path;
    }
    return reqPath;
  }

  resultHandle<T>(config: HttpCustomConfig): (observable: Observable<ActionResult<T>>) => Observable<T> {
    return (observable: Observable<ActionResult<T>>) => {
      return observable.pipe(
        filter(item => {
          return this.handleFilter(item, !!config.needSuccessInfo);
        }),
        map(item => {
          // 200開頭
          if (this.isCodeOkgo(item.code)) {
            // OKGO
            return item.data;
          }

          // code 不是 200開頭 且不是 0 的話，就是錯誤
          throw new Error(item.msg);
        })
      );
    };
  }

  handleFilter<T>(item: ActionResult<T>, needSuccessInfo: boolean): boolean {

    if (!this.isCodeOkgo(item.code)) {
      this.message.error(item.msg + "handleFilter base-http.service.ts");
    } else if (needSuccessInfo) {
      this.message.success('操作成功');
    }
    return true;
  }

  /**
   *
   * 驗證 200開頭  or 0 為正常
   *
   */
  isCodeOkgo(code: number): boolean {
    if ((200 <= code && code < 300) || code === 0) {
      // OKGO
      return true;
    }
    return false;
  }
}
