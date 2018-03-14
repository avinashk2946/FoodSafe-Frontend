import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UploaddataService {

	 	public APIUrl='http://localhost:3000/file/upload'

  constructor(private http:Http) { }

//   	this.upload .onCompleteFile=(File:any, response:any,status:any,
//   		headers:any){
// 	this.attachmentList.push(JSON.parse(response));
// }
  	private headers= new Headers(
		{
			"Content-Type":"application/json",
			}

		);

uploaddata (FormData:any){
	return this.http
	.post(this.APIUrl,{headers:this.headers})
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
