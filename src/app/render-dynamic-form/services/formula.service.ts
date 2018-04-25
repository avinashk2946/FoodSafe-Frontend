import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {calculateFormula} from './formula.calculator'
@Injectable()
export class FormulaService {
 data:any[]=[];
 dataChange$:BehaviorSubject<boolean>=new BehaviorSubject(true);
 constructor() { };

 get isDataChanged (){
  return this.dataChange$.asObservable();
 }
 setIsDataChanged(d){
   this.data=d;
   this.dataChange$.next(true);
 }

  calculateFormula(expression,dataPoint){
    return calculateFormula(expression,dataPoint)
  }

}
