import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RawMaterialService } from '../../raw-material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';

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

  public samplePreparations = []; /// : SamplePreparation[];

  public totalSamples = 0;

  uploader: FileUploader = new FileUploader({});

  public current = new Sample('', '', new FileUploader({}), false, false, false, '');

  public qualityanadisabled = false;
  public pavirusadisabled = false;
  public pesticdiedisabled = false;
  public supplierlotdisable = true;


  constructor(public rawMatService: RawMaterialService, fb: FormBuilder, public router: Router, public route: ActivatedRoute) {
    this.sampleForm = fb.group({
      'supplierLot': ['', Validators.required],
      'qaAnalysis': ['', Validators.required],
      'pathvirsuFcon': ['', Validators.required],
      'pestcidesFcon': ['', Validators.required],
      'comments': []
    });

    this.route.params.subscribe(params => {
      this.recordId = params.id;
      this.getSamplePreparations();
      this.getSampleCollections();
    });
  }

  ngOnInit() {

  }

  public addNewSample() {
    this.showEditFields = true;
    this.current = new Sample('', '', new FileUploader({}), false, false, false, '');
  }

  public addFile(e, list) {
    e.preventDefault();
    list.push({ attachment: '' });
  }

  delete(e: Event, index: number, list) {
    e.preventDefault();
    list.splice(index, 1);
  }

  public changeSupplierLot() {
    const sampleobj = _.find(this.samplePreparations, { '_id': this.current.supplierLot });
    if (sampleobj !== undefined) {
      this.supplierlotdisable = false;
      this.current.quaAnalsisIndicator = sampleobj.qualityAnalysis ? true : false;
      this.current.pesticideIndicator = sampleobj.pesticideTest ? true : false;
      this.current.paViIndIndicator = this.getPaVirIndicator(sampleobj) ? true : false;
    } else {
      this.supplierlotdisable = true;
      this.current.quaAnalsisIndicator = false;
      this.current.pesticideIndicator = false;
      this.current.paViIndIndicator = false;
    }
    this.qualityanadisabled = this.current.quaAnalsisIndicator ? false : true;
    this.pavirusadisabled = this.current.paViIndIndicator ? false : true;
    this.pesticdiedisabled = this.current.pesticideIndicator ? false : true;

  }

  // based on pathogen virus and indictor test
  getPaVirIndicator(sampleobj) {

    if (sampleobj.pathogenTest === false && sampleobj.indicatorTest === false && sampleobj.virusTest === false) {
      return false;
    } else {
      return true;
    }
  }
  doTextareaValueChange(ev) {
    try {
      this.current.conmment = ev.target.value;
    } catch (e) {
      console.log('texarea failed.');
    }
  }


  public saveUpdateSample(current) {
    console.log(current);
    this.showEditFields = false;
    this.current.id = 'sample_supplierlot_1'; // this.createId();
    this.sampleList.push({
      id: this.current.id,
      //   attachments: this.current.attachments.queue[0]._file.name,
      supplierLot: _.find(this.samplePreparations, { '_id': this.current.supplierLot }).supplierLot,
      quaAnalsisIndicator: this.current.quaAnalsisIndicator,
      paViIndIndicator: this.current.paViIndIndicator,
      pesticideIndicator: this.current.pesticideIndicator,
      conmment: this.current.conmment
    });
    return false;
  }

  public deleteSelected(event: Event, index: number, attachmentsQueue) {
    event.preventDefault();
    attachmentsQueue.splice(index, 1);
  }

  getSamplePreparations() {
    this.rawMatService.getSamplePreparation(this.recordId)
      .subscribe((response: any) => {
        response.data.forEach(element => {

          for (let i = 0; i < element.samples.length; i++) {
            this.samplePreparations.push(element.samples[i]);
            console.log(element.samples[i].quantityPlanned);
            this.totalSamples = this.totalSamples + element.samples[i].quantityPlanned;
            this.supplierLotlist.push({ label: element.samples[i].supplierLot, value: element.samples[i]._id });
          }
          console.log(this.samplePreparations);
        });
      }, err => {
        console.log('Error occured while getting sample preparation from db.');
      });
  }

  getSampleCollections() {
    this.rawMatService.getSampleCollection(this.recordId)
      .subscribe((response: any) => {

        console.log('Existing sample collection :' + response);


        /* response.data.forEach(element => {

          for (let i = 0; i < element.samples.length; i++) {
            this.sampleList.push(element.samples[i]);
            console.log(element.samples[i].quantityPlanned);
            this.totalSamples = this.totalSamples + element.samples[i].quantityPlanned;
          }
          console.log(this.samplePreparations);
        }); */
      }, err => {
        console.log('Error occured while getting sample preparation from db.');
      });
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

// export class SamplePreparation {
//   id: string;
//   supplierLot: string;
//   newLot: boolean;
//   po: string;
//   totalQuantity: number;
//   qualityAnalysis: boolean;
//   quantityPlanned: boolean;
//   indicatorTest: boolean;
//   pathogenTest: boolean;
//   virusTest: boolean;
//   pesticideTest: boolean;
//   conmment: string;

//   constructor(id, supplierlot, newlot, po, totalqantity, qaulityanalysis, quantityplanned,
//     indictortest, pathogentest, virustest, pestcidestest, comments) {
//     this.id = id;
//     this.supplierLot = supplierlot;
//     this.newLot = newlot;
//     this.po = po;
//     this.totalQuantity = totalqantity;
//     this.qualityAnalysis = qaulityanalysis;
//     this.quantityPlanned = quantityplanned;
//     this.indicatorTest = indictortest;
//     this.pathogenTest = pathogentest;
//     this.virusTest = virustest;
//     this.pesticideTest = pestcidestest;
//     this.conmment = comments;
//   }

// }
