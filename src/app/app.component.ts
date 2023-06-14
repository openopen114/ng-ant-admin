import { NgIf, AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DrawerWrapService } from '@app/drawer/base-drawer';
import { PreloaderService } from '@core/services/common/preloader.service';
import { LockScreenComponent } from '@shared/components/lock-screen/lock-screen.component';
import { LockScreenStoreService } from '@store/common-store/lock-screen-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { fnStopMouseEvent } from '@utils/tools';
import { ModalWrapService } from '@widget/base-modal';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { fadeRouteAnimation } from './animations/fade.animation';

@Component({
  selector: 'app-root',
  template: `
    <!-- 锁屏頁面  -->
    <app-lock-screen *ngIf="(lockedState$ | async)!.locked"></app-lock-screen>


    <!-- BackTop回到顶部 -->
    <nz-back-top></nz-back-top>

    <!-- router-outlet  -->
    <div class="full-height" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    
    <!-- loading 指示器  -->
 <div *ngIf="loading$ | async" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(24,144,255,0.1);">
      <div style="position:absolute;top: 50%;left:50%;margin:-16px 0 0 -16px;">
        <nz-spin nzSize="large"></nz-spin>
      </div>
    </div>  
 

    <!-- 全螢幕  -->
    <ng-template #modalBtnTpl>
      <div class="center">
        <span class="hover-blue full-height flex-auto text-right d-i-b" (click)="fullScreenIconClick($event)">
          <i class="m-r-8" nz-icon nzTheme="outline" [nzType]="!modalFullScreenFlag ? 'fullscreen' : 'fullscreen-exit'"></i>
        </span>
        <span class="hover-red full-height flex-auto d-i-b" (click)="modalFullScreenFlag = false">
          <i nz-icon nzTheme="outline" nzType="close"></i>
        </span>
      </div>
    </ng-template>

    <ng-template #drawerFootDefaultTpl>
      <div class="end-start-center">
        <button class="m-r-8" nz-button nzType="default" (click)="drawerWrapService.cancel()">取消0000</button>
        <button nz-button nzType="primary" (click)="drawerWrapService.sure()">確定1111</button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeRouteAnimation],
  standalone: true,
  imports: [NgIf, LockScreenComponent, NzBackTopModule, RouterOutlet, NzSpinModule, NzIconModule, NzButtonModule, NzWaveModule, AsyncPipe]
})
export class AppComponent implements OnInit, AfterViewInit {
  loading$ = this.spinService.getCurrentGlobalSpinStore();
  lockedState$ = this.lockScreenStoreService.getLockScreenStore();
  @ViewChild('modalBtnTpl') modalBtnTpl!: TemplateRef<any>;
  @ViewChild('drawerFootDefaultTpl') drawerFootDefaultTpl!: TemplateRef<any>;
  modalFullScreenFlag = false;
  destroyRef = inject(DestroyRef);
  constructor(
    public drawerWrapService: DrawerWrapService,
    private modalWrapService: ModalWrapService,
    private lockScreenStoreService: LockScreenStoreService,
    private preloader: PreloaderService,
    private spinService: SpinService,
    public router: Router
  ) { }

  // 所有对话框扩展最大化按钮，将templateRef传入Modal基础service的妥协方法
  fullScreenIconClick($event: MouseEvent): void {
    this.modalFullScreenFlag = !this.modalFullScreenFlag;
    fnStopMouseEvent($event);
    this.modalWrapService.fullScreenIconClick();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: NzSafeAny) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NzSafeAny) => {
        this.spinService.setCurrentGlobalSpinStore(false);
      });
  }

  ngAfterViewInit(): void {
    this.preloader.removePreLoader();
    this.modalWrapService.setTemplate(this.modalBtnTpl);
    this.drawerWrapService.setTemplate(this.drawerFootDefaultTpl);
  }
}
