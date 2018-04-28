import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RawMaterialService } from '../../raw-material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CommonService } from '../../../../../common/common.service';

import { TabsSevice } from '../tabs.service';
import { ISubscription } from 'rxjs/Subscription';
import { GLOBAL_PROPERTIES } from '../../../../../common/common.constant';
import { NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.scss',
    '../../../../../../assets/icon/icofont/css/icofont.scss']
})
export class SampleCollectionComponent implements OnInit {


  public supplierLotlist: any = [];
  public showEditFields = false;
  public sampleForm: FormGroup;
  public recordId: string;
  public sampleList = [];
  public samplePreparations = [];
  public totalSamples = 0;
  public supplierlot;
  public imagedata: any;
  public isEditingSampleCollID = '';
  private tabs: any;
  private subscription: ISubscription;
  private samplepreparationId;
  public remainingsamples;
  public supdrpclear = true;

  public caseImgl: undefined;

  public samplePreparationCountMap = new Map();
  public sampleCollectionCountMap = new Map();

  uploader: FileUploader = new FileUploader({});
  attachments = [];

  constructor(public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    fb: FormBuilder, public router: Router, public route: ActivatedRoute, private tabService: TabsSevice) {

    this.sampleForm = fb.group({
      'supplierLot': ['', Validators.required],
      'qaAnalysis': ['', Validators.required],
      'pathvirsuFcon': ['', Validators.required],
      'pestcidesFcon': ['', Validators.required],
      'comments': [],
      'attachment': ''
    });

    this.route.params.subscribe(params => {
      this.recordId = params.id;
      this.getSamplePreparations();

    });
  }

  ngOnInit() { }

  public addNewSample() {
    this.showEditFields = true;
    this.rebuildForm();
  }

  rebuildForm() {
    this.sampleForm.patchValue({
      qaAnalysis: false,
      pathvirsuFcon: false,
      pestcidesFcon: false,
    });

    this.sampleForm.get('qaAnalysis').enable();
    this.sampleForm.get('pathvirsuFcon').enable();
    this.sampleForm.get('pestcidesFcon').enable();
    this.sampleForm.get('attachment').setValue({});
    this.sampleForm.get('comments').setValue('');
    this.attachments = [];
    this.sampleForm.get('supplierLot').patchValue([]);
  }

  public addFile(e, list) {
    e.preventDefault();
    list.push({ attachment: '' });
  }

  delete(e: Event, index: number, list) {
    e.preventDefault();
    list.splice(index, 1);
    this.sampleForm.get('attachment').setValue({});
  }

  public changeSupplierLot() {
    const sampleobj = _.find(this.samplePreparations, { '_id': this.supplierlot });

    if (sampleobj !== undefined) {
      this.sampleForm.patchValue({
        qaAnalysis: sampleobj.qualityAnalysis ? true : false,
        pathvirsuFcon: this.getPaVirIndicator(sampleobj) ? true : false,
        pestcidesFcon: sampleobj.pesticideTest ? true : false,
      });

      sampleobj.qualityAnalysis ? this.sampleForm.get('qaAnalysis').enable() : this.sampleForm.get('qaAnalysis').disable();
      this.getPaVirIndicator(sampleobj) ? this.sampleForm.get('pathvirsuFcon').enable() : this.sampleForm.get('pathvirsuFcon').disable();
      sampleobj.pesticideTest ? this.sampleForm.get('pestcidesFcon').enable() : this.sampleForm.get('pestcidesFcon').disable();

    } else {
      this.rebuildForm();
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.attachments.push({ imagedata: 'data:image/png;base64,' + reader.result.split(',')[1] });
        this.sampleForm.get('attachment').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  // based on pathogen virus and indictor test
  getPaVirIndicator(sampleobj) {
    if (sampleobj.pathogenTest === false && sampleobj.indicatorTest === false && sampleobj.virusTest === false) {
      return false;
    } else {
      return true;
    }
  }

  public saveUpdateSample(current) {

    const dataModel = {
      'record': this.recordId,
      // 'samplePreparation': this.sampleForm.get('supplierLot').value,
      'samplePreparation': this.samplepreparationId,
      'sampleCollection': this.isEditingSampleCollID === '' ? null : this.isEditingSampleCollID,
      'base64': this.sampleForm.get('attachment').value.value,
      'fileName': this.sampleForm.get('attachment').value.filename,
      'supplierLot': _.find(this.samplePreparations, { '_id': this.supplierlot }).supplierLot,
      'qualityAnalysis': this.sampleForm.get('qaAnalysis').value,
      'testGrp': this.sampleForm.get('pathvirsuFcon').value,
      'pesticideTest': this.sampleForm.get('pestcidesFcon').value,
      'comment': this.sampleForm.get('comments').value
    };

    console.log(dataModel);
    this.rawMatService.saveSingleSampleCollection(dataModel)
      .subscribe((response: any) => {
        //  console.log(response);
        this.showEditFields = false;
        this.getSampleCollections();
        this.comonSrvc.showSuccessMsg(response.message);
        this.rebuildForm();
      }, err => {
        this.comonSrvc.showErrorMsg(err.message);
      });

    return false;
  }

  getSamplePreparations() {
    this.rawMatService.getSamplePreparation(this.recordId)
      .subscribe((response: any) => {

        this.samplepreparationId = response.data[0]._id;
        response.data.forEach(element => {

          for (let i = 0; i < element.samples.length; i++) {
            this.samplePreparations.push(element.samples[i]);
            //   console.log(element.samples[i].quantityPlanned);
            this.totalSamples = this.totalSamples + element.samples[i].quantityPlanned;
            this.supplierLotlist.push({ label: element.samples[i].supplierLot, value: element.samples[i]._id });

            if (this.samplePreparationCountMap.has(element.samples[i].supplierLot)) {
              this.samplePreparationCountMap.set(element.samples[i].supplierLot,
                this.samplePreparationCountMap.get(element.samples[i].supplierLot)
                + element.samples[i].quantityPlanned);
            } else {
              this.samplePreparationCountMap.set(element.samples[i].supplierLot,
                element.samples[i].quantityPlanned);
            }
          }
          console.log(this.samplePreparationCountMap);
          // console.log(this.samplePreparations);
          this.supplierLotlist = _.uniqBy(this.supplierLotlist, 'value');
          this.getSampleCollections();
        });
      }, err => {
        console.log('Error occured while getting sample preparation from db.');
      });
  }

  getSampleCollections() {
    this.rawMatService.getSampleCollection(this.recordId)
      .subscribe((response: any) => {

        //  console.log('Existing sample collection :' + JSON.stringify(response));
        this.sampleList = [];
        this.sampleCollectionCountMap = new Map();
        response.data.forEach(element => {
          this.isEditingSampleCollID = element._id;
          for (let i = 0; i < element.samples.length; i++) {
            const sampleobj = {
              supplierLot: element.samples[i].supplierLot,
              caseImg: GLOBAL_PROPERTIES.BASE_API_URL + '' + element.samples[i].caseImg.replace('./', ''),
              qualityAnalysis: element.samples[i].qualityAnalysis,
              testGrp: element.samples[i].testGrp,
              pesticideTest: element.samples[i].pesticideTest,
              comment: element.samples[i].comment,
              imagename: element.samples[i].caseImg.split('_')[1],
              id: element.samples[i]._id
            };
            this.sampleList.push(sampleobj);
            if (this.sampleCollectionCountMap.has(element.samples[i].supplierLot)) {
              const key = element.samples[i].supplierLot;
              this.sampleCollectionCountMap.set(key, this.sampleCollectionCountMap.get(key) + 1);
            } else {
              const key = element.samples[i].supplierLot;
              this.sampleCollectionCountMap.set(key, 1);
            }
          }
          console.log(this.sampleCollectionCountMap);
          this.supplierLotCondition();
          this.remainingsamples = this.totalSamples - element.samples.length;
        });
        console.log(this.sampleList);
      }, err => {
        console.log('Error occured while getting sample preparation from db.');
      });
  }

  onNext() {
    this.subscription = this.tabService.getMessage().subscribe(tabState => {
      this.tabs = tabState.value;
      this.tabs.select('qualityanalysisid');
    });
  }

  onExit() {
    this.router.navigate(['/recordkeeping/raw-matrial']);
  }

  onPrevious() {
    this.subscription = this.tabService.getMessage().subscribe(tabState => {
      this.tabs = tabState.value;
      this.tabs.select('samplepreparationid');
    });
  }

  deleteSample(sampleid) {
    console.log(this.isEditingSampleCollID + ' : ' + sampleid);
    this.rawMatService.deleteSingleSampleCollection(this.isEditingSampleCollID, sampleid)
      .subscribe((response: any) => {
        this.comonSrvc.showSuccessMsg('Sample Collection has been deleted successfully');
        this.getSampleCollections();
      }, err => {
        this.comonSrvc.showErrorMsg('Error deleting Sample Collection.');
      });
  }
  updateSamplecoll(sampleobj) {
    console.log(JSON.stringify(sampleobj));
    this.showEditFields = true;
    const index = this.setDropdwonValue(sampleobj.supplierLot);
    this.supplierlot = this.supplierLotlist[index].value;
    this.sampleForm.get('supplierLot').
      patchValue(this.supplierLotlist[index].value);


    this.sampleForm.patchValue({
      qaAnalysis: sampleobj.qualityAnalysis,
      pathvirsuFcon: sampleobj.testGrp,
      pestcidesFcon: sampleobj.pesticideTest
    });

    sampleobj.qualityAnalysis ? this.sampleForm.get('qaAnalysis').enable() : this.sampleForm.get('qaAnalysis').disable();
    sampleobj.testGrp ? this.sampleForm.get('pathvirsuFcon').enable() : this.sampleForm.get('pathvirsuFcon').disable();
    sampleobj.pesticideTest ? this.sampleForm.get('pestcidesFcon').enable() : this.sampleForm.get('pestcidesFcon').disable();

  }

  setDropdwonValue(supplierlot) {
    return _.findIndex(this.supplierLotlist, { label: supplierlot });
  }

  supplierLotCondition() {
    const toBeRemovedSupplierlots = [];
    for (let i = 0; i < this.supplierLotlist.length; i++) {
      console.log(this.supplierLotlist[i]);
      const key = this.supplierLotlist[i].label;
      const smplpreCount = this.samplePreparationCountMap.get(key);
      const smplcollCount = this.sampleCollectionCountMap.get(key);
      if (smplpreCount === smplcollCount) {
        toBeRemovedSupplierlots.push(key);
      }
    }
    toBeRemovedSupplierlots.forEach(element => {
      _.remove(this.supplierLotlist, { label: element });
    });
    console.log(toBeRemovedSupplierlots);
  }

}

export class Sample {
  id: string;
  attachments: FileUploader;
  supplierLot: string;
  quaAnalsisIndicator: boolean;
  paViIndIndicator: boolean;
  pesticideIndicator: boolean;
  conmment: string;

  constructor(id, supplierLot, attachments, quaAnalsisIndicator, paViIndIndicator, pesticideIndicator, comments) {
    this.id = id;
    this.attachments = attachments;
    this.supplierLot = supplierLot;
    this.quaAnalsisIndicator = quaAnalsisIndicator;
    this.paViIndIndicator = paViIndIndicator;
    this.pesticideIndicator = pesticideIndicator;
    this.conmment = comments;
  }

}
