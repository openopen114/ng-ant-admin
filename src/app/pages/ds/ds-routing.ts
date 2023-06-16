import { Route } from '@angular/router';

import { DsComponent } from './ds.component'
export default [
    {
        path: '',
        component: DsComponent,
        data: { key: 'ds', shouldDetach: 'no' },
        children: [
            { path: '', redirectTo: '/ds/DSAUTHDSAUTH', pathMatch: 'full' },
            {
                path: 'DSAUTHDSAUTH',
                data: { preload: true, key: 'DSAUTHDSAUTH', shouldDetach: 'no' },
                loadComponent: () => import('./dsauthdsauth/dsauthdsauth.component').then(m => m.DSAUTHDSAUTHComponent)
            },
        ]
    }
] as Route[];
