import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlightServiceService {
  private Loaddata: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public $Loaddata: Observable<any[]> = this.Loaddata.asObservable();
  constructor() { }
  storeLoad = (data) => {
    debugger;
    this.Loaddata.next(data)
    return;
  }
}
