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
    public fb: FormBuilder,
    
    ) 
    {
  this. createForm();
     }

    public itemAddForm: FormGroup;
    @Input() sample: String = "abc"

    selectedTest : any = '';
    pathogenTest : any = "false";
    indicatorTest : any = 'false';
    virusTest : any = 'false';
    pesticideTest : any = 'false';
    test = '';
    public item: any="";


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
       supplierLot         : "",
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
     // {
     //   supplierLot         : "supplierLot2",
     //   newLot              :true,
     //   po                  :"po2",
     //   totalQuantity       :20,
     //   quantityPlanned       :2,
     //   qualityAnalysis     :false,

     //   // tests
     //   indicatorTest       :false,
     //   pathogenTest       :false,
     //   virusTest       :false,
     //   pesticideTest       :false,

     //   // picture of case, to be used in sample collection
     //   caseImg           :{type:String},

     // },
     //    {
     //   supplierLot         : "supplierLot3",
     //   newLot              :true,
     //   po                  :"po3",
     //   totalQuantity       :30,
     //   quantityPlanned      :2,
     //   qualityAnalysis     :false,

     //   // tests
     //   indicatorTest       :false,
     //   pathogenTest        :false,
     //   virusTest           :false,
     //   pesticideTest       :false,

     //   // picture of case, to be used in sample collection
     //   caseImg           :{type:String},

     // }

     ];

  public changeTest ():void {
    if(this.test != ''){

      this.samples.forEach(element => {
        element.pathogenTest = (this.test == "true") ? true : false;
        element.indicatorTest = (this.test == "true") ? true : false;
        element.pesticideTest = (this.test == "true") ? true : false;
        element.virusTest = (this.test == "true") ? true : false;
      })
    }
  }


  createForm() {
    this.itemAddForm = this.fb.group({
      items:this.fb.array([
         this.fb.group({
            supplierlot:['',],
            newlot: [''],
            ifnopreviouspo:[''],
            totalquality:[''],
            qcanalysys:[''],
            qualityplannedforsampling:[''],
            indicatortest:[''],
            pathogentest:[''],
            virustest:[''],
            Pestisidetest:[''],

        })
      ])
    });
    // ]);    
  }
public addMember(e:Event){
  e.preventDefault();
  let items=this.itemAddForm.controls.items as FormArray;
  items.push(
    this.fb.group({
        supplierlot:['',],
        newlot: [''],
        ifnopreviouspo:[''],
        totalquality:[''],
        qcanalysys:[''],
        qualityplannedforsampling:[''],
        indicatortest:[''],
        pathogentest:[''],
        virustest:[''],
        Pestisidetest:[''],
    })
  );
}

    delete(e:Event,index: number) {
      e.preventDefault();
            const control = <FormArray>this.itemAddForm.controls['items'];
             if (control.length>1) {
               control.removeAt(index);
             }
        

    }
}
