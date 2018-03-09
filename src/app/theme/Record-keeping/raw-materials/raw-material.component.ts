import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RawMaterialsService } from '../../../service/raw-materials.service';
import { PlantService } from '../../../service/plant.service';
import { SupplierService } from '../../../service/supplier.service';
import { ProductService } from '../../../service/product.service';
import { BrokerService } from '../../../service/broker.service';
import { UploaddataService } from '../../../service/uploaddata.service';
import {FileUploader} from 'ng2-file-upload';


import  { Rawmaterial } from '../../../classes/rawmaterial';
import  { Plant } from '../../../classes/plant';
import  { Supplier } from '../../../classes/supplier';
import  { Broker } from '../../../classes/broker';
import  { Product } from '../../../classes/product';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: [
    './raw-material.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]

})
export class RawmaterialComponent implements OnInit {


      
 // uploader: FileUploader = new FileUploader;
 
    dataForm : FormGroup;

    rawmaterial: any = 'rawmaterials[]';

    plant : any = 'Plant[]';
    createdDate : any = new Date();
    createdBy : any = 'admin';
    supplier : any = 'Supplier[]';
    broker : any = 'Broker[]';
    coo : any = '';
    product : any = 'Product[]';
    productCode : any = '';
    variety : any = '';
    approved : any = '';
    kosher : any = '';
    nonGMO : any = '';
    po : any = '';
    containerNo : any = '';
    lotNo : any = '';
    FormData:any="";
    dataLoader:any="";

  //   plants : Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];
  // supliers : Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];
  // brokers : Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];
  // coos : Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];
  // products: Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];
  // productCodes: Array<any> =[
  //   {value: 'AF', label: 'Afghanistan'},
  //   {value: 'AX', label: 'Åland Islands'},
  //   {value: 'AL', label: 'Albania'},
  //   {value: 'DZ', label: 'Algeria'},
  //   {value: 'AS', label: 'American Samoa'},
  //   {value: 'AD', label: 'Andorra'},
  //   {value: 'AO', label: 'Angola'},
  //   {value: 'AI', label: 'Anguilla'},
  //   {value: 'AQ', label: 'Antarctica'},
  //   {value: 'AG', label: 'Antigua and Barbuda'},
  //   {value: 'AR', label: 'Argentina'}
  // ];


    constructor(private fb : FormBuilder,public rawmaterialsservice:RawMaterialsService,
      public suppliersservice:SupplierService,
      public plantservice:PlantService,
      public productservice:ProductService,
      public brokerservice:BrokerService,
      public uploaddataservice:UploaddataService,) {
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
  console.log(this.supplier);
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



  public loadplant():void {
   console.log(this.plant)
    if(this.plantservice.get(this.plant)){
      this.plantservice.view(this.plant.value)
      .then(plants=>this.plant=plants);
    }else{
      this.plant=[];
    }
}
     public loadsupplier():void {
     console.log(this.supplier)
      if(this.suppliersservice.get(this.supplier)){
        this.suppliersservice.view(this.supplier.value)
        .then(suppliers=>this.supplier=suppliers);
      }else{
        this.supplier=[];
    }
  }  
   public loadbroker():void {
     console.log(this.broker)
      if(this.brokerservice.get(this.broker)){
        this.brokerservice.view(this.broker.value)
        .then(brokers=>this.broker=brokers);
      }else{
        this.broker=[];
    }
}
    public loadproduct():void {
     console.log(this.product)
      if(this.productservice.get(this.product)){
        this.productservice.view(this.product.value)
        .then(products=>this.product=products);
      }else{
        this.product=[];
    }
  }

      // public uploadFile(){
      //     let files=this.uploaddataservice.uploaddata('selectFile').files;
      //     let formData=new FormData();
      //     let file =files[0];
      //     formData.append('selectFile',file,file.name);
      //     this.uploaddataservice.uploaddata(formData)
      //     .subscribe(res=>this.dataLoader(res));
      //   }
  // }


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
        
  //     files=[
  //               {
  //                 'name':"Bill of Lading",
  //                 "class":"Bill of Lading"
  //               },     
            
  //               {
  //                   'name':"Commercial Invoice",
  //                   'class': 'Commercial Invoice'
  //               },
  //               {
  //                   'name':"Packing list",
  //                   'class': 'Packing list'
  //               },
  //               {
  //                   'name':"COA",
  //                   'class': 'COA'
  //               },
  //               {
  //                   'name':"CCP verification records",
  //                   'class': 'CCP verification records'
  //               },
  //               {
  //                   'name':"Environmental Monitoring records",
  //                   'class': 'Environmental Monitoring records'
  //               },
  //               {
  //                   'name':"Other Supporting records",
  //                   'class': 'Other Supporting records'
  //               },               
      
  //           ];        

  }
