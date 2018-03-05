import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/observable/throw';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
import  { Plant } from '../../../classes/plant';

@Injectable()
export class RawMaterialsService {

   private baseUrl = 'http://localhost:3000/plant';

    constructor(private http: Http) { }
     private headers=new Headers(
    {
        "Content-Type":"application/json",
        
        // "Authorization":"Bearer "+this.access_token

    } 
  );


     	handleToken:any;
     	handleError:any;
     	toPromise:any;


	get(plant:Plant): Promise<Plant>{
			  return this.handleToken(this).then(()=>{
			  return this.http
			  .get(this.baseUrl,{headers: this.headers})  
			  .toPromise()
			  .then(res=> res.json() as Plant)
			  .catch((error)=>this.handleError(error));
			});	  
	}

	view(id: number):Promise<Plant>{
		 const baseUrl = `${this.baseUrl}/${id}`;
	  	 return this.handleToken(this).then(()=>{
		 return this.http.get(baseUrl,{headers:this.headers})
		.toPromise()
		.then(response =>{ return response.json() as Plant ;})
	  	.catch((error)=>this.handleError(error));	
		});
	}
	
	 // list(extradata=undefined):Promise<Plant>{
	 //  // return this.handleToken(this).then(()=>{
  //         return  this.list(extradata)
  //         .toPromise()
  //         .then(response =>{
  //          return response as Plant
  //         })
  //         .catch((error)=>{return this.handleError(error)});
  //     // });
  //   }
}