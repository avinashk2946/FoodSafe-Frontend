import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RawMaterialService} from '../../../../service/raw-material.service';
import { Supplier} from '../../../../classes/supplier';

@Component({
  selector: 'app-raw-material-details',
  templateUrl: './raw-material-details.component.html',
  styles: []
})
export class RawMaterialDetailsComponent implements OnInit {


  constructor(private http: Http,private rawmaterialservice: RawMaterialService) { }

  ngOnInit() {
  }

   // getOrder(): Observable<Supplier[]> {
   //       return this.http
   //           .get(this._postsURL)
   //           .map((response: Response) => {
   //               return <Supplier[]>response.json();
   //           })
   //           .catch(this.handleError);
   //   }
 
   //   private handleError(error: Response) {
   //       return Observable.throw(error.statusText);
   //   }
}
