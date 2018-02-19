import { Injectable } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RawMaterialService {

  constructor(private http: Http) { }

// getOrder(): Observable<any> {
//     return this.http.get('src/assets/supplier.json')//, options)
//         .map((response: Response) => {
//             console.log("data" + response.json());
//             return response.json();
//         }
//     )
//     // .catch(this.handleError);
// } 

 
}
