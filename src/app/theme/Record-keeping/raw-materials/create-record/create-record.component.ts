import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { CommonService } from '../../../../common/common.service';
import { RawMaterialService } from '../raw-material.service';

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
export class CreateRecordComponent implements OnInit, AfterViewInit {

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
  po: any = '';
  containerNo: string;
  lotNo: string;
  plant: any = '';
  supplier: any = '';
  selectedSupplier: any = '';
  selectedMaterial: any = '';
  materialGrp = '';
  material = '';
  // disabled: true;

  constructor(private fb: FormBuilder, public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage, public router: Router, public route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.resetform();
  }

  ngOnInit() {
    this.CreateForm();
    this.getPlant();

    this.localStorage.getItem('user').subscribe((user) => {
      this.createdBy = user.user.username;
      this.createdById = user.user._id;
    });

    this.route.queryParams.subscribe(params => {
      this.po = params.po;
      this.containerNo = params.containerNo;
      this.lotNo = params.lotNo;
    });
  }


  public CreateForm() {

    this.dataForm = this.fb.group({
      po: [{ value: 'po' }, [Validators.required]],
      lotNo: [{ value: 'lotNo' }, [Validators.required]],
      containerNo: [{ value: 'containerNo' }, [Validators.required]],
      createdBy: ['', [Validators.required]],

      plant: [null, Validators.required],
      supplier: [null, [Validators.required]],
      broker: [null, [Validators.required]],
      coo: [null, [Validators.required]],
      materialGrp: [null, [Validators.required]],
      material: [null, [Validators.required]],
      variety: [null, [Validators.required]],

      isApproved: [{ value: 'isApproved', disabled: true }],
      kosher: [{ value: 'kosher', disabled: true }],
      nonGMO: [{ value: 'nonGMO', disabled: true }],
      organicValue: [{ value: 'organicValue', disabled: true }]

    });

  }


  onRecordCreate() {
    const obj = {
      plant: this.plant,
      supplier: this.supplier,
      broker: this.broker,
      country: this.dataForm.get('coo').value,
      po: this.po,
      containerNo: this.containerNo,
      lotNo: this.lotNo,
      variety: this.dataForm.get('variety').value,
      rawMaterial: this.material,
      nonGMO: this.dataForm.get('nonGMO').value,
      createdBy: this.createdById,
      materialGrp: this.materialGrp
    };

    this.rawMatService.saveRecord(obj).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
      this.router.navigate(['/recordkeeping/raw-matrial/document-upload', response.data._id]);
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }

  getPlant() {
    this.rawMatService.getPlant().subscribe((response: any) => {
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

  public changePlant(): void {
    this.plant = this.dataForm.get('plant').value;
    this.supplierList = [];
    if (this.plant !== null) {
      this.rawMatService.getSupplier(this.plant).subscribe((response: any) => {
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
  }

  public changeSupplier(): void {

    this.supplier = this.dataForm.get('supplier').value;
    this.brokerList = [];

    if (this.supplier !== null && this.plant !== null) {
      const obj = {
        plantId: this.plant,
        supplierId: this.supplier
      };

      this.selectedSupplier = _.find(this.supplierList, { '_id': this.supplier });

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
      }, err => {
        if (err.status === 401) {
        }
      });

    }
  }

  public changeBroker(): void {
    this.broker = this.dataForm.get('broker').value;
    this.productList = [];
    if (this.supplier !== null && this.plant !== null && this.broker) {

      const obj = {
        plantId: this.plant,
        supplierId: this.supplier,
        brokerId: this.broker
      };

      this.rawMatService.getRawMatrialGroup(obj).subscribe((response: any) => {
        this.materialGrpList = response.data;
      }, err => {
        if (err.status === 401) {
        }
      });

    }
  }
  public changeMaterialGroup(): void {

    this.materialGrp = this.dataForm.get('materialGrp').value;

    if (this.materialGrp !== null && this.plant !== null && this.supplier !== null && this.broker !== null) {
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
      }, err => {
        if (err.status === 401) {
        }
      });
    }
  }
  public changeMaterial(): void {
    this.material = this.dataForm.get('material').value;
    if (this.material !== null) {
      this.selectedMaterial = _.find(this.materialList, { '_id': this.material });

      this.dataForm.patchValue({
        isApproved: '' + this.selectedMaterial.isApproved + '',
        kosher: '' + this.selectedMaterial.kosher + '',
        nonGMO: '' + this.selectedMaterial.nonGmo + '',
        organicValue: '' + this.selectedMaterial.organic + ''
      });
    }
  }

  public redirecttoRecord() {
    this.router.navigate(['/recordkeeping/raw-matrial']);
  }

  public resetform() {
    console.log('resetting the form');
    this.po = undefined;
    this.dataForm.patchValue({

      po: undefined,
      lotNo: undefined,
      containerNo: undefined,

      plant: null,
      supplier: null,
      broker: null,
      coo: null,
      variety: null,
      material: null,
      materialGrp: null,

      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }

  public onMaterialClear() {
    console.log('material cleared !!');
    this.dataForm.patchValue({
      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }

  onMaterialGrpClear() {
    console.log('material grp cleared !!');
    this.dataForm.patchValue({
      variety: null,
      material: null,

      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }

  onBrokerClear() {
    this.dataForm.patchValue({
      materialGrp: null,
      variety: null,
      material: null,

      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }
  public onSupplierClear() {
    this.dataForm.patchValue({
      broker: null,
      coo: null,
      materialGrp: null,
      variety: null,
      material: null,

      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }
  public onPlantClear() {
    this.dataForm.patchValue({
      supplier: null,
      broker: null,
      coo: null,
      materialGrp: null,
      variety: null,
      material: null,

      isApproved: false,
      kosher: false,
      nonGMO: false,
      organicValue: false

    });
  }
}
