import { Component, Input, OnInit, Output, OnChanges, EventEmitter, ViewChild, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RawMaterialService } from '../../raw-material.service';
import { CommonService } from '../../../../../common/common.service';
import { AuthService } from '../../../../../common/auth.service';
import { LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';


@Component({
  selector: 'app-sample-preparation',
  templateUrl: './sample-preparation.component.html',
  styleUrls: ['./sample-preparation.component.scss',
    '../../../../../../assets/icon/icofont/css/icofont.scss']
})
export class SamplePreparationComponent implements OnInit {

  tempSearchTerm = '';
  searchTerm = new Subject<string>();
  ifPurchaseorderEmpty = false;
  results: Object;
  public itemAddForm: FormGroup;
  recordDetails: any = {};
  selectedTest: any = '';
  pathogenTest: any = '';
  indicatorTest: any = '';
  virusTest: any = '';
  pesticideTest: any = '';
  test = '';
  public item: any = '';
  recordId = '';
  samples = [
    {
      supplierLot: '',
      newLot: '',
      po: '',
      totalQuantity: '',
      qualityAnalysis: false,
      quantityPlanned: '',
      indicatorTest: false,
      pathogenTest: false,
      virusTest: false,
      pesticideTest: false,
      conmment: ''
    }
  ];

  constructor(public fb: FormBuilder, public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    public router: Router, private route: ActivatedRoute, protected localStorage: AsyncLocalStorage) {
    this.route.params.subscribe(params => {
      this.recordId = params.id;
    });


  }

  ngOnInit() {
    // this is not right approach, we should be using sharing betwen component.
    this.localStorage.getItem('recordDetails').subscribe((recordDetails) => {
      console.log(recordDetails);
      this.recordDetails = recordDetails;

      // Planned to place in constructor but  we are depenedent on supplier id
      this.rawMatService.searchSupplier(this.searchTerm, this.recordDetails.supplier._id,
        this.recordDetails.rawMaterial.rmCode)
        .subscribe((response: any) => {
          console.log(response.data);
          const index = _.findIndex(this.samples, { 'supplierLot': this.tempSearchTerm });
          this.updateSampleObj(index, response.data);
        }, err => {

        });

      this.rawMatService.getSamplePreparation(this.recordDetails._id)
        .subscribe((response: any) => {
          if (response.data.length !== 0) {
            this.samples = [];
          }
          response.data.forEach(element => {
            this.samples.push(element.samples[0]);
          });
        }, err => {

        });

    });
  }

  public changeNewLot(item): void {
    if (item.newLot !== '') {
      item.pathogenTest = (item.newLot === true) ? true : false;
      item.pesticideTest = (item.newLot === true) ? true : false;
      item.virusTest = (item.newLot === true) ? true : false;
    }
  }
  createForm() {
    // this.itemAddForm = this.fb.group({
    //   items: this.fb.array([
    //     this.fb.group({
    //       supplierlot: ['',],
    //       newlot: [''],
    //       ifnopreviouspo: [''],
    //       totalquality: [''],
    //       qcanalysys: [''],
    //       qualityplannedforsampling: [''],
    //       indicatortest: [''],
    //       pathogentest: [''],
    //       virustest: [''],
    //       Pestisidetest: [''],

    //     })
    //   ])
    // });
    // ]);
  }
  public addRow(e: Event) {
    e.preventDefault();
    this.samples.push({
      supplierLot: '',
      newLot: '',
      po: '',
      totalQuantity: '',
      qualityAnalysis: false,
      quantityPlanned: '',
      indicatorTest: false,
      pathogenTest: false,
      virusTest: false,
      pesticideTest: false,
      conmment: ''
    });
  }

  removeRow(e, index: number) {
    e.preventDefault();
    this.samples.splice(index, 1);
  }
  saveSampleRecord() {
    const obj = {
      record: this.recordId,
      samples: this.samples
    };
    this.rawMatService.saveSamplePreparation(obj).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }

  public handleEvent(sampleadded: any) {
    this.item = sampleadded;
  }

  public searchForSupplier(supplierlot) {
    this.tempSearchTerm = supplierlot;
    this.searchTerm.next(supplierlot);
  }
  public updateSampleObj(index, response) {
    console.log('In Update Sample obj' + index, response);
    this.samples[index].newLot = response.newLot ? 'Yes' : 'No';
    this.samples[index].po = response.po;
    this.samples[index].pathogenTest = response.pathogenTest;
    this.samples[index].pesticideTest = response.pesticideTest;
    this.samples[index].virusTest = response.virusTest;
    if (this.samples[index].po === '') {
      this.ifPurchaseorderEmpty = true;
    } else {
      this.ifPurchaseorderEmpty = false;
    }
  }
}
