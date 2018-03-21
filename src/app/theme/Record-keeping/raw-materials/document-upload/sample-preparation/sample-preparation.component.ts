import { Component,Input, OnInit } from '@angular/core';
import  { Supplier } from '../../../../../classes/supplier';
import { SupplierService } from '../../../../../service/supplier.service';
import { FormBuilder  , FormGroup ,FormArray ,Validators }  from '@angular/forms';


@Component({
  selector: 'app-sample-preparation',
  templateUrl: './sample-preparation.component.html',
  styleUrls: ['./sample-preparation.component.scss']
})
export class SamplePreparationComponent implements OnInit {

  constructor(
  	private supplierservice:SupplierService,
  	
  	) 
  	{

  	 }


	@Input() supplier: Supplier;

  	ngOnInit() {

       // this.brokerservice.samplePreparation()
       // .subscribe(function(response) {
       //   this.samplePreparation = response.json();
       //   console.log(this.samplePreparation);
       // });
  	}

  // samplePreparationId : any = '';
  // samplePreparation:any = {};

//  menus =[
//     {
//         sate: "Test1",
//         name: 'Test1'
//     },

// ]

  samplingmethod: string = "test1";  
  pathogentest:string = "test2";
  virustest:string = "test3";
  pesticidestest:string = "test4";
  preparedby:string="admin";

 
  supplierlot:string="1233212132";
  newlot:string="yes";
  ifnopreviouspo:string="";
  totalquality:string="500";
  qcanalysys:string="yes";
  qualityplannedforsampling:string="10";
  indicatortest:string="No";
  // pathogentest:string="admin";
  // virustest:string="admin";
  Pestisidetest:string="Yes";
}
