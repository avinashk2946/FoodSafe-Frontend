import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UploaddataService {

	 	public baseUrl='http://localhost:3000/upload'

  constructor(private http:Http) { }
  	private headers= new Headers(
		{
			"Content-Type":"application/json",
			}

		);

uploaddata (FormData:any){
	return this.http
	.post(this.baseUrl,{headers:this.headers})
	 	.catch(this.errorHandler);
			 }
			 private errorHandler(error:Response){
			 	console.error("Error :" + error);
			 	return Observable.throw(error || " Error on Server ");

	 		}

 getdata(){
	 	let baseUrl="";

	 	return this .http.get(baseUrl)
	 	.catch(this. errorHandler);
	 }
}
