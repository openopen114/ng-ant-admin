import { Route } from '@angular/router';

import { DwComponent } from './dw.component'
export default [
  {
    path: '',
    component: DwComponent,
    data: { key: 'dw', shouldDetach: 'no' },
    children: [
      { path: '', redirectTo: '/dw/DWMSGDWMSG', pathMatch: 'full' },
      {
        path: 'DWMSGDWMSG',
        data: { preload: true, title: 'DWMSGDWMSG頁面', key: 'DWMSGDWMSG', shouldDetach: 'no' },
        loadComponent: () => import('./dwmsgdwmsg/dwmsgdwmsg.component').then(m => m.DwmsgdwmsgComponent)
      },
    ]
  }
] as Route[];
