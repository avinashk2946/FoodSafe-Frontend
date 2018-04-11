import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  str : string = 'sample data';

  getData(){
  	return this.str;
  }

  setData(){
  	this.str = 'changed data';
  }

}
