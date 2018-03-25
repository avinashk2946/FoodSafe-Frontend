import { Component,Input, OnInit } from '@angular/core';
import  { Supplier } from '../../../../../classes/supplier';
// import  { SamplePreparation } from '../../../../../classes/sample-preparation';
import { SupplierService } from '../../../../../service/supplier.service';
import { FormBuilder, FormGroup ,FormArray ,Validators }  from '@angular/forms';


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


    @Input() sample: String = "abc"



    public ngOnChanges(){
      console.log("changed",);
    }


    

	// @Input() supplier: Supplier;
  // @Input () samplepreparation:SamplePreparation;

  	ngOnInit() {

       // this.supplierservice.samplePreparation()
       // .subscribe(function(response) {
       //   this.samplePreparation = response.json();
       //   console.log(this.samplePreparation);
       // });
  	}



 samples =[
           {
       supplierLot         : "supplierLot1",
       newLot              :true,
       po                  :"po1",
       totalQuantity       :100,
       quantityPlanned       :200,
       qualityAnalysis     :false,

       // tests
       indicatorTest       :false,
       pathogenTest       :false,
       virusTest       :false,
       pesticideTest       :false,

       // picture of case, to be used in sample collection
       caseImg           :{type:String},


     },
     {
       supplierLot         : "supplierLot2",
       newLot              :true,
       po                  :"po2",
       totalQuantity       :20,
       quantityPlanned       :2,
       qualityAnalysis     :false,

       // tests
       indicatorTest       :false,
       pathogenTest       :false,
       virusTest       :false,
       pesticideTest       :false,

       // picture of case, to be used in sample collection
       caseImg           :{type:String},

     },
        {
       supplierLot         : "supplierLot3",
       newLot              :true,
       po                  :"po3",
       totalQuantity       :30,
       quantityPlanned      :2,
       qualityAnalysis     :false,

       // tests
       indicatorTest       :false,
       pathogenTest        :false,
       virusTest           :false,
       pesticideTest       :false,

       // picture of case, to be used in sample collection
       caseImg           :{type:String},

     }

     ];

}
