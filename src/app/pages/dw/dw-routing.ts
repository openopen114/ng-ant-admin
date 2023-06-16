import { Route } from '@angular/router';

import { DwComponent } from './dw.component'
export default [
  {
    path: '',
    component: DwComponent,
    data: { key: 'dw', shouldDetach: 'no' },
    children: [
      { path: '', redirectTo: '/dw/DWMSGDWMSGC', pathMatch: 'full' },
      {
        path: 'DWMSGDWMSGC',
        data: { preload: true, key: 'DWMSGDWMSGC', shouldDetach: 'no' },
        loadComponent: () => import('./dwmsgdwmsg/dwmsgdwmsg.component').then(m => m.DwmsgdwmsgComponent)
      },
    ]
  }
] as Route[];
