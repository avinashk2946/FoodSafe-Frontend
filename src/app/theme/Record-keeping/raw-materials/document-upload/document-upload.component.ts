import { Component, ElementRef, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';


import { FileUploader } from 'ng2-file-upload';
import { Http } from '@angular/http';
import { HttpEventType } from '@angular/common/http';


import { Router, ActivatedRoute } from '@angular/router';
import { TabsSevice } from './tabs.service';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import { LocationStrategy } from '@angular/common';
import * as _ from 'lodash';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: [
    './document-upload.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ],

  providers: [RawMaterialService]

})
export class DocumentUploadComponent implements OnInit {

  @ViewChild('tabs')
  private tabs: any;

  constructor(private fb: FormBuilder, private tabService: TabsSevice, public rawMatService: RawMaterialService,
    public comonSrvc: CommonService, protected localStorage: AsyncLocalStorage, public router: Router,
    public http: Http, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.recordId = params.id;
      this.getRecordDetails();
    });
  }

  uploader: FileUploader = new FileUploader({});

  attachmentList: FileUploader = new FileUploader({});

  currentDocType = '';

  fileList = [
    { label: 'Bill of Lading', value: 'billOfLanding' },
    { label: 'Commercial Invoice', value: 'commercialInvoice' },
    { label: 'Packing list', value: 'packingList' },
    { label: 'COA', value: 'coa' },
    { label: 'CCP verification records', value: 'ccpVerification' },
    { label: 'Environmental Monitoring records', value: 'environmentalMonitoring' },
    { label: 'Other Supporting records', value: 'otherSupporting' }
  ];

  recordId: any = '';
  recordDetails: any = {};

  ngOnInit() {
    this.getRecordDetails();
  }

  onNext() {
    this.tabs.select('samplepreparationid');
    this.tabService.sendMessage(this.tabs);
  }



  getRecordDetails() {
    this.rawMatService.getRecordData(this.recordId).subscribe((response: any) => {
      this.recordDetails = response.data[0];
      this.localStorage.setItem('recordDetails', this.recordDetails).subscribe(() => { }, () => { });
    }, err => {
      this.comonSrvc.showErrorMsg('Document upload - Error in getting a list of record');
    });
  }

  public addFile(e, list) {
    e.preventDefault();
    list.push({ attachment: '' });
  }

  delete(e: Event, index: number, list) {
    e.preventDefault();
    list.splice(index, 1);
  }

  uploadFile() {
    const formData: any = new FormData();
    this.attachmentList.queue.forEach(obj => {
      formData.append(this.currentDocType, obj.file.rawFile);
    });
    formData.append('_id', this.recordId);
    this.updateAttachment(formData);
  }

  updateAttachment(formData) {
    this.rawMatService.uploadAttachment(formData).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }
}
