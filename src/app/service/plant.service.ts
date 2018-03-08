import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import  { Rawmaterial } from '../classes/rawmaterial';
import  { Plant } from '../classes/plant';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlantService {
	private baseUrl='http://loalhost:3000/plant'

  constructor(private http:Http) { }

		private headers= new Headers(
		{
		 "Content-Type":"application/json",	
		}
			
	);


	get(plant:Plant): Promise<Plant>{	  
			  return this.http
			  .get(this.baseUrl,{headers: this.headers})  
			  .toPromise()	
			  .then(res=> res.json() as Plant)	
		  
	}

	view(id: number):Promise<Plant>{
		 const baseUrl = `${this.baseUrl}/${id}`;
		 return this.http.get(baseUrl,{headers:this.headers})
		.toPromise()
		.then(response =>{ return response.json() as Plant ;})
	  		
	}


	 // list(extradata=undefined):Promise<Plant>{
  //         return list(extradata)
  //         .toPromise()
  //         .then(response =>{
  //          return response as Plant
  //         })
  //         .catch((error)=>{return this.handleError(error)});
  //   }
}

// .post(this.baseUrl,JSON.stringify(plant),{headers: this.headers})  