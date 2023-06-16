import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DWMSGDWMSGComponent } from './dwmsgdwmsg/dwmsgdwmsg.component'

const routes: Routes = [

  {
    path: '',
    component: DWMSGDWMSGComponent,
    data: { key: 'dw', shouldDetach: 'no' },
    children: [
      { path: '', redirectTo: '/dw/DWMSGDWMSG', pathMatch: 'full' },
      {
        path: 'DWMSGDWMSG',
        data: { preload: true, key: 'DWMSGDWMSG', shouldDetach: 'no' },
        loadComponent: () => import('./dwmsgdwmsg/dwmsgdwmsg.component').then(m => m.DWMSGDWMSGComponent)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DwRoutingModule { }
