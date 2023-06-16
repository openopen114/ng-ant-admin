import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Menu } from '@core/services/types';

// 菜单store service
@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {
  private menuArray$ = new BehaviorSubject<Menu[]>([]);

  constructor() { }

  setMenuArrayStore(menuArray: Menu[]): void {
    console.log('setMenuArrayStore 0')
    this.menuArray$.next(menuArray);
    console.log('setMenuArrayStore 1')
  }

  getMenuArrayStore(): Observable<Menu[]> {
    return this.menuArray$.asObservable();
  }
}
