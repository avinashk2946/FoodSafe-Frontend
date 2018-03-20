import {Component, ElementRef, OnInit,Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Supplier } from '../../../../classes/supplier';
import { Plant } from '../../../../classes/plant';
import { Broker } from '../../../../classes/broker';

import {FileUploader} from 'ng2-file-upload';
import { Http} from '@angular/http';
import { HttpEventType} from '@angular/common/http';


import { Router , ActivatedRoute} from '@angular/router';

import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import { AuthService } from '../../../../common/auth.service';
import { LocationStrategy } from '@angular/common';
import * as _ from "lodash";
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: [
    './create-record.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers:[RawMaterialService]

})
export class CreateRecordComponent implements OnInit {
  dataForm : FormGroup;
  // plant : Plant;
  rawmaterial: any = 'rawmaterials[]';
  createdDate : any = new Date();
  plantList = [];
  brokerList = [];
  supplierList = [];
  productList = [];
  createdBy : any = '';
  createdById : any = '';
  broker : any = '';
  coo : any = '';
  product : any = '';
  productCode : any = '';
  variety : any = '';
  isApproved : any = "false";
  kosher : any = 'false';
  nonGMO : any = 'false';
  po : any = '';
  containerNo : any = '';
  lotNo : any = '';
  plant : any = '';
  supplier : any = '';
  selectedSupplier : any = '';
  selectedProduct : any = '';

  submitted:boolean;
  selectedFile:File = null;

 // @Input() plant=[];
 @Input() Broker=[];
 @Input() Supplier=[];


  constructor(
    private fb : FormBuilder,
    public rawMatService:RawMaterialService,
    public comonSrvc:CommonService,
    protected localStorage: AsyncLocalStorage,
    public router:Router ,
    // public suppliersservice:SupplierService,
    //public plantservice:PlantService,
    // public productservice:ProductService,
    // public brokerservice:BrokerService,
  ) {}

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
      'lotNo' : ['', [Validators.required]],
      'organic' : ['', [Validators.required]],
    });

     // window.localStorage.setItem('Rawmatid','-1');
    //this.plantservice.getplant().subscribe(responseplants=>this.plant=responseplants);
    this.getPlant();
    this.localStorage.getItem('user').subscribe((user) => {
      console.log(user) // should be 'Henri'
      this.createdBy = user.user.username;
      this.createdById = user.user._id;

    });
  } 
  onRecordCreate() {
    let obj = {
      plant : this.plant,
      supplier : this.supplier,
      broker : this.broker,
      country : this.coo,
      product : this.product,
      approved : (this.isApproved == 'true') ? true : false,
      po : this.po,
      containerNo : this.containerNo,
      lotNo : this.lotNo,
      variety : this.variety,
      nonGmo : this.nonGMO,
      createdBy : this.createdById,
      isDelete : false
    }
    console.log('this.dataForm.value',obj);
    this.rawMatService.saveRecord(obj).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
      // this.router.navigate("'/document-upload')
      this.router.navigate(['/document-upload',123]);
    }, err => { 
      this.comonSrvc.showErrorMsg(err.message);
    });
    //this.dataForm.reset();
  };
  getPlant () {
    this.rawMatService.getPlant().subscribe((response: any) => {
      console.log(response);
      this.plantList = response.data;
      this.plantList.forEach(element => {
        element.label = element.name;
        element.value = element._id;
      });

    }, err => { 
      if (err.status === 401) {
      }
    });
  }
  
  public changePlant ():void {
    // this.plantservice.getplant().subscribe((response: any) => {
    //   console.log(response);
    // });
    this.supplierList = [];
    if(this.plant != '')
      this.rawMatService.getSupplier(this.plant).subscribe((response: any) => {
        console.log(response);
        this.supplierList = response.data;
        this.supplierList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
      }, err => { 
        if (err.status === 401) {
        }
      });
  }


  public changeSupplier ():void {
    this.brokerList = [];
    if(this.supplier != ''){
      var obj = {
        plantId : this.plant,
        supplierId:this.supplier
      }
      this.selectedSupplier = _.find(this.supplierList,{"_id":this.supplier});
      this.selectedSupplier.address.forEach(element => {
        element.label = element.country;
        element.value = element.country;
      })
      this.rawMatService.getBroker(obj).subscribe((response: any) => {
        this.brokerList = response.data;
        this.brokerList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
      }, err => { 
        if (err.status === 401) {
        }
      });
    }
  }

  public changeBroker ():void {
    this.productList = [];
    if(this.supplier != ''){
     var obj = {
       plantId : this.plant,
       supplierId:this.supplier,
       brokerId:this.broker
     }
      this.rawMatService.getProduct(obj).subscribe((response: any) => {
        this.productList = response.data;
        this.productList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
      }, err => { 
        if (err.status === 401) {
        }
      });
    }
  }
  public changeProduct ():void {
    if(this.product != ''){
      this.selectedProduct = _.find(this.productList,{"_id":this.product});
      // this.selectedProduct.variety.forEach(element => {
      //   element.label = element.country;
      //   element.value = element._id;
      // })
    }
  }


  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0]
  // }


  // public onSubmit(){
  //   this.submitted=true;
  //   if (this.dataForm.valid) {
  //     let requetsdata=this.dataForm.value;
  //     requetsdata.rawmaterial_type = 2;
  //     this.rawmaterialsservice.create(requetsdata).then((responseRawmat )=>{
  //       window.localStorage.setItem('Rawmatid',responseRawmat.id+'');
  //       this.router.navigate(['/']); 
  //     })
  //   } 
  // }


}
