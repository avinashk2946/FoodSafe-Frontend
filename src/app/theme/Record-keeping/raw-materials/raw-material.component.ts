import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: [
    './raw-material.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]

})
export class RawmaterialComponent implements OnInit {
    dataForm : FormGroup;
    plant : any = '';
    createdDate : any = new Date();
    createdBy : any = 'admin';
    suplier : any = '';
    broker : any = '';
    coo : any = '';
    product : any = '';
    productCode : any = '';
    variety : any = '';
    approved : any = '';
    kosher : any = '';
    nonGMO : any = '';
    po : any = '';
    containerNo : any = '';
    lotNo : any = '';
    plants : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  supliers : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  brokers : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  coos : Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  products: Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];
  productCodes: Array<any> =[
    {value: 'AF', label: 'Afghanistan'},
    {value: 'AX', label: 'Åland Islands'},
    {value: 'AL', label: 'Albania'},
    {value: 'DZ', label: 'Algeria'},
    {value: 'AS', label: 'American Samoa'},
    {value: 'AD', label: 'Andorra'},
    {value: 'AO', label: 'Angola'},
    {value: 'AI', label: 'Anguilla'},
    {value: 'AQ', label: 'Antarctica'},
    {value: 'AG', label: 'Antigua and Barbuda'},
    {value: 'AR', label: 'Argentina'}
  ];


    constructor(private fb : FormBuilder) {
    }
      
  ngOnInit() {
    this.dataForm = this.fb.group({
      'plant' : ['', [Validators.required]],
      'createdDate' : ['', [Validators.required]],
      'createdBy' : ['', [Validators.required]],
      'suplier' : ['', [Validators.required]],
      'broker' : ['', [Validators.required]],
      'coo' : ['', [Validators.required]],
      'product' : ['', [Validators.required]],
      'productCode' : ['', [Validators.required]],
      'variety' : ['', [Validators.required]],
      'approved' : ['', [Validators.required]],
      'kosher' : ['', [Validators.required]],
      'nonGMO' : ['', [Validators.required]],
      'po' : ['', [Validators.required]],
      'containerNo' : ['', [Validators.required]],
      'lotNo' : ['', [Validators.required]]
    });
  }

onRecordCreate() {
  console.log('this.dataForm.value',this.dataForm.value);
  console.log(this.plant);
  console.log(this.createdDate);
console.log(this.createdBy);
console.log(this.suplier);
console.log(this.broker);
console.log(this.coo);
console.log(this.product);
console.log(this.productCode);
console.log(this.variety);
console.log(this.approved);
console.log(this.kosher);
console.log(this.nonGMO);
console.log(this.po);
console.log(this.containerNo);
console.log(this.lotNo);
this.dataForm.reset();
    /*this.loginSrvc.verifyUser(this.loginForm.value).subscribe(
      (resData: any) => {
      console.log('res',resData);
      this.comonSrvc.showSuccessMsg(resData.message);
      this._router.navigate(['/configuration']);
    }, err => { 
      if (err.status === 401) {
        this.comonSrvc.showErrorMsg(err.message);
      }else{
        this.comonSrvc.showErrorMsg(err.message);
      }
     
    });*/
  };






        //  plants =[
        //     {
        //         plant: "Montreal",
        //         name: 'Montreal'
        //     },
        //      {
        //         plant: "Canada",
        //         name: 'Canada'
        //     },
             
        // ];

        //   suppliers =[
        //     {
        //         plant: "Montreal",
        //         name: 'Montreal'
        //     },
        //      {
        //         plant: "Canada",
        //         name: 'Canada'
        //     },
             
        // ];
       
        //   brokers =[
        //     {
        //         plant: "Montreal",
        //         name: 'Montreal'
        //     },
        //      {
        //         plant: "Canada",
        //         name: 'Canada'
        //     },
             
        // ];
        //   coos =[
        //     {
        //         plant: "Montreal",
        //         name: 'Montreal'
        //     },
        //      {
        //         plant: "Canada",
        //         name: 'Canada'
        //     },
             
        // ];


        // submit(){

        // }
        // // save(){

        // }
        // // cancel(){

        // }
        
      files=[
                {
                  'name':"Bill of Lading",
                  "class":"Bill of Lading"
                },     
            
                {
                    'name':"Commercial Invoice",
                    'class': 'Commercial Invoice'
                },
                {
                    'name':"Packing list",
                    'class': 'Packing list'
                },
                {
                    'name':"COA",
                    'class': 'COA'
                },
                {
                    'name':"CCP verification records",
                    'class': 'CCP verification records'
                },
                {
                    'name':"Environmental Monitoring records",
                    'class': 'Environmental Monitoring records'
                },
                {
                    'name':"Other Supporting records",
                    'class': 'Other Supporting records'
                },               
      
            ];        

}
