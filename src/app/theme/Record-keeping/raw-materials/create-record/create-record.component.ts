import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { Http } from '@angular/http';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../../common/common.service';
import { RawMaterialService } from '../raw-material.service';
import { LocationStrategy } from '@angular/common';
import * as _ from 'lodash';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: [
    './create-record.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [RawMaterialService]

})
export class CreateRecordComponent implements OnInit {

  dataForm: FormGroup;
  public value: boolean = null;

  id: number;
  rawmaterial: any = 'rawmaterials[]';
  plantList = [];
  brokerList = [];
  supplierList = [];
  productList = [];
  materialGrpList = [];
  materialList = [];
  address: any = '';

  createdDate: any = new Date();
  createdBy: any = '';
  createdById: any = '';
  broker: any = '';
  coo: any = '';
  product: any = '';
  productCode: any = '';
  variety: any = '';
  isApproved: any = '';
  kosher: any = '';
  nonGMO: any = '';
  organicValue: any = '';
  po:  any = '';
  containerNo:string;
  lotNo: string;
  plant: any = '';
  supplier: any = '';
  selectedSupplier: any = '';
  selectedMaterial: any = '';
  materialGrp = '';
  material = '';
  // disabled: true;
  

  constructor(private fb: FormBuilder, public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage, public router: Router, public route: ActivatedRoute)
     {
   
      }

  ngOnInit() {
    this.CreateForm();
    let selectedRecord:any;
    this.route.queryParams.subscribe(params => {
      this.po = params.po;
      this.containerNo = params.containerNo;
      this.lotNo = params.lotNo;
      selectedRecord = params.selectedRecord;
      // calling record by id
      if(selectedRecord) {
        this.rawMatService.getRecord(selectedRecord).subscribe((response: any) => {
          selectedRecord = response.data[0];
          // autofill Record details
          this.autoFillRecord(selectedRecord);
        }, err => {
          this.comonSrvc.showErrorMsg(err.message);
        });
      }
      else{
        this.getPlant();
        this.localStorage.getItem('user').subscribe((user) => {
          this.createdBy = user.user.username;
          this.createdById = user.user._id;
        });
      }
    });
  }

public autoFillRecord(selectedRecord:any) {
  this.getPlant(selectedRecord);
}
public CreateForm(){
   this.dataForm = this.fb.group({
      plant: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      broker: ['', [Validators.required]],
      coo: ['', [Validators.required]],
      variety: ['', [Validators.required]],
      isApproved: [{ value: 'isApproved', disabled: true }, [Validators.required]],
      kosher: [{ value: 'kosher', disabled: true }, [Validators.required]],
      nonGMO: [{ value: 'nonGMO', disabled: true }, [Validators.required]],
      po: ['', [Validators.required]],
      containerNo: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      lotNo: ['', [Validators.required]],
      organicValue: [{ value: 'organicValue', disabled: true }, [Validators.required]],
      material: ['', [Validators.required]],
      materialGrp: ['', [Validators.required]]
    });
}


  onRecordCreate() {
    const obj = {
      plant: this.plant,
      supplier: this.supplier,
      broker: this.broker,
      country: this.coo,
      po: this.po,
      containerNo: this.containerNo,
      lotNo: this.lotNo,
      variety: this.variety,
      rawMaterial: this.material,
      nonGMO: this.nonGMO,
      createdBy: this.createdById,
      materialGrp: this.materialGrp
      // isDelete : false
    };

    this.rawMatService.saveRecord(obj).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
      this.router.navigate(['/recordkeeping/raw-matrial/document-upload', response.data._id]);
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }

  getPlant(selectedRecord:any = null ) {
    this.rawMatService.getPlant().subscribe((response: any) => {
      console.log(response);
      this.plantList = response.data;
      this.plantList.forEach(element => {
        element.label = element.name;
        element.value = element._id;
      });
      if(selectedRecord) {
        this.changePlant(selectedRecord);
      }
    }, err => {
      if (err.status === 401) {
      }
    });
  }

  public changePlant(selectedRecord:any = null): void {
    if(selectedRecord && selectedRecord.plant._id) {
      this.plant = selectedRecord.plant._id;
    }
    this.supplierList = [];
    if (this.plant !== '') {
      this.rawMatService.getSupplier(this.plant).subscribe((response: any) => {
        console.log(response);
        this.supplierList = response.data;
        this.supplierList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
        if(selectedRecord){
          this.changeSupplier(selectedRecord);
        }
      }, err => {
        if (err.status === 401) {
        }
      });
    }
  }

  public changeSupplier(selectedRecord:any = null): void {
    if(selectedRecord && selectedRecord.supplier._id){
      this.supplier = selectedRecord.supplier._id;
    }
    this.brokerList = [];

    if (this.supplier !== '') {
      const obj = {
        plantId: this.plant,
        supplierId: this.supplier
      };

      this.selectedSupplier = _.find(this.supplierList, { '_id': this.supplier });

      // let({supplierList._id} supplierlist){
      //   new_id.find(x => x._d[supplierList])+= value;
      // }
      this.selectedSupplier.address.forEach(element => {
        element.label = element.country;
        element.value = element.country;
      });

      this.rawMatService.getBroker(obj).subscribe((response: any) => {
        this.brokerList = response.data;
        this.brokerList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
        if(selectedRecord){
          this.changeBroker(selectedRecord);
        }
      }, err => {
        if (err.status === 401) {
        }
      });

    }
  }

  public changeBroker(selectedRecord:any = null): void {
    if(selectedRecord && selectedRecord.broker && selectedRecord.broker._id){
      this.broker = selectedRecord.broker._id;
    }
    this.productList = [];
    if (this.supplier !== '') {

      const obj = {
        plantId: this.plant,
        supplierId: this.supplier,
        brokerId: this.broker
      };

      this.rawMatService.getRawMatrialGroup(obj).subscribe((response: any) => {
        this.materialGrpList = response.data;
        if(selectedRecord){
          this.changeMaterialGroup(selectedRecord);
        }
      }, err => {
        if (err.status === 401) {
        }
      });

    }
  }
  public changeMaterialGroup(selectedRecord:any = null): void {
    if(selectedRecord && selectedRecord.rawMaterial && selectedRecord.rawMaterial.rmGroupName){
      this.materialGrp = selectedRecord.rawMaterial.rmGroupName;
    }
    if (this.materialGrp !== '') {
      const obj = {
        plantId: this.plant,
        supplierId: this.supplier,
        brokerId: this.broker,
        matrialGrp: this.materialGrp
      };
      this.rawMatService.getRawMatrial(obj).subscribe((response: any) => {
        this.materialList = response.data;
        this.materialList.forEach(element => {
          element.label = element.name;
          element.value = element._id;
        });
          if(selectedRecord && selectedRecord.rawMaterial){
            this.changeMaterial(selectedRecord);
          }
      }, err => {
        if (err.status === 401) {
        }
      });
    }
  }
  public changeMaterial(selectedRecord:any = null): void {
    if(selectedRecord){
      this.material = selectedRecord.rawMaterial._id;
    }
    if (this.material !== '') {
      this.selectedMaterial = _.find(this.materialList, { '_id': this.material });
      this.nonGMO = (this.selectedMaterial.nonGMO) ? 'true' : 'false';
      this.organicValue = (this.selectedMaterial.organicValue) ? 'true' : 'false';
      this.isApproved = (this.selectedMaterial.isApproved) ? 'true' : 'false';
      this.kosher = (this.selectedMaterial.kosher) ? 'true' : 'false';
    }
  }

  public redirecttoRecord(){
    this.router.navigate(['/recordkeeping/raw-matrial']);
  }
}
