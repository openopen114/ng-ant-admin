import { DOCUMENT, registerLocaleData } from '@angular/common';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import zh_Hant from '@angular/common/locales/zh-Hant';
import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding, withHashLocation, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';

import { MenuFoldOutline, MenuUnfoldOutline, FormOutline, DashboardOutline } from '@ant-design/icons-angular/icons';
import { appRoutes } from '@app/app-routing';
import { AppComponent } from '@app/app.component';
import interceptors from '@app/core/services/interceptors';
import { InitThemeService } from '@core/services/common/init-theme.service';
import { LoadAliIconCdnService } from '@core/services/common/load-ali-icon-cdn.service';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { ScrollService } from '@core/services/common/scroll.service';
import { SelectivePreloadingStrategyService } from '@core/services/common/selective-preloading-strategy.service';
import { SubLockedStatusService } from '@core/services/common/sub-locked-status.service';
import { SubWindowWithService } from '@core/services/common/sub-window-with.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { StartupService } from '@core/startup/startup.service';
import { environment } from '@env/environment';
import { NzDrawerServiceModule } from 'ng-zorro-antd/drawer';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

// tsconfig.json > compilerOptions > path  定義縮路徑寫

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];


registerLocaleData(zh_Hant, 'zh-tw');


// TODO: 確認用途
// 取 token 並登入並給權限 & 菜單資料 
export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function LoadAliIconCdnFactory(loadAliIconCdnService: LoadAliIconCdnService) {
  return () => loadAliIconCdnService.load();
}

export function InitThemeServiceFactory(initThemeService: InitThemeService) {
  return async () => await initThemeService.initTheme();
}

export function InitLockedStatusServiceFactory(subLockedStatusService: SubLockedStatusService) {
  return () => subLockedStatusService.initLockedStatus();
}

export function SubWindowWithServiceFactory(subWindowWithService: SubWindowWithService) {
  return () => subWindowWithService.subWindowWidth();
}

// APP_INITIALIZER 用法
// https://ithelp.ithome.com.tw/articles/10207812



const APPINIT_PROVIDES = [
  // 项目启动
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  },
  // load阿里图标库cdn
  {
    provide: APP_INITIALIZER,
    useFactory: LoadAliIconCdnFactory,
    deps: [LoadAliIconCdnService],
    multi: true
  },
  // 初始化锁屏服务
  {
    provide: APP_INITIALIZER,
    useFactory: InitLockedStatusServiceFactory,
    deps: [SubLockedStatusService],
    multi: true
  },
  // 初始化主题
  {
    provide: APP_INITIALIZER,
    useFactory: InitThemeServiceFactory,
    deps: [InitThemeService],
    multi: true
  },
  // 初始化监听屏幕宽度服务
  {
    provide: APP_INITIALIZER,
    useFactory: SubWindowWithServiceFactory,
    deps: [SubWindowWithService],
    multi: true
  },
  // 初始化暗黑模式还是default模式的css
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeSkinService) => () => {
      return themeService.loadTheme();
    },
    deps: [ThemeSkinService],
    multi: true
  }
];

if (environment.production) {
  enableProdMode();
}


// TODO:確認 http Interceptor

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy, deps: [DOCUMENT, ScrollService] },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    provideRouter(
      appRoutes,
      withPreloading(SelectivePreloadingStrategyService),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      }),
      withHashLocation(),
      withComponentInputBinding() // 开启路由参数绑定到组件的输入属性,ng16新增特性
    ),
    importProvidersFrom(NzMessageServiceModule, NzDrawerServiceModule, NzModalModule),
    ...interceptors,
    ...APPINIT_PROVIDES,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
