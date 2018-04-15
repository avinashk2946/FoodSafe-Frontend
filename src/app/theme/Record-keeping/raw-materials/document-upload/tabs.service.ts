import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs';

@Injectable()
export class TabsSevice {

  constructor() { }

  private _setTabs = new ReplaySubject<any>(1);
  sendMessage(tabState: any) {
    this._setTabs.next({ value: tabState });
  }


getMessage(): Observable<any> {
    return this._setTabs.asObservable();
}
  
}
