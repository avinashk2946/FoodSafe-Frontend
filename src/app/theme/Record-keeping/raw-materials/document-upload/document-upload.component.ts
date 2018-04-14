import { Component, ElementRef, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


import { FileUploader } from 'ng2-file-upload';
import { Http } from '@angular/http';
import { HttpEventType } from '@angular/common/http';


import { Router, ActivatedRoute } from '@angular/router';

import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import { AuthService } from '../../../../common/auth.service';
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

     private tabs :any;
    // @Input() tabs: NgbTabset;
    @Input() activeTab: string = '';
    // @Output() activeTabChange: EventEmitter<string> = new EventEmitter<string>();
    // @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

 currentOrientation = 'horizontal';


  constructor(private fb: FormBuilder, public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage, public router: Router, public http: Http, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.recordId = params.id;
      this.getRecordDetails();
    });

  }

  public onlineOffline: boolean = navigator.onLine;

  attchmentList = [{ attachment: '' }];

  uploader: FileUploader = new FileUploader({});

  fileList = [
    { 'title': 'Bill of Lading', 'attachmentList': new FileUploader({ isHTML5: true }), 'name': 'billOfLanding' },
    { 'title': 'Commercial Invoice', 'attachmentList': new FileUploader({}), 'name': 'commercialInvoice' },
    { 'title': 'Packing list', 'attachmentList': new FileUploader({}), 'name': 'packingList' },
    { 'title': 'COA', 'attachmentList': new FileUploader({}), 'name': 'coa' },
    { 'title': 'CCP verification records', 'attachmentList': new FileUploader({}), 'name': 'ccpVerification' },
    { 'title': 'Environmental Monitoring records', 'attachmentList': new FileUploader({}), 'name': 'environmentalMonitoring' },
    { 'title': 'Other Supporting records', 'attachmentList': new FileUploader({}), 'name': 'otherSupporting' }
  ];

  recordId: any = '';
  recordDetails: any = {};
  dataForm: FormGroup;
  UploadFiles: any = '';
  online$ = Observable.fromEvent(window, 'online');
  offline$ = Observable.fromEvent(window, 'offline');
  public files: File[];
  public filesAddForm: FormGroup;


  public  samplepreparation:any[];
  public  samplecollection:any[];
  public  qualityanalysisid:any[];


  ngOnInit() {
    this.getRecordDetails();
    this.online$.subscribe(e => this.syncWithServer());
  }

  syncWithServer() {
    // cons
    // this.localStorage.getItem('recordFiles').subscribe((formData) => {
    //   console.log(formData);
    //   this.updateAttachment(formData);
    // });
    // this.localStorage.getItem('testOne').subscribe((formData1) => {
    //   console.log(formData1);
    //   //this.updateAttachment(formData);
    // });
  }

  getRecordDetails() {
    this.rawMatService.getRecordData(this.recordId).subscribe((response: any) => {
      this.recordDetails = response.data[0];
      this.localStorage.setItem('recordDetails', this.recordDetails).subscribe(() => { }, () => { });
    }, err => {
      if (err.status === 401) {
      }
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
    this.fileList.forEach(element => {
      let i = 1;
      let name = element.name;
      element.attachmentList.queue.forEach(obj => {
        name = name + i;
        formData.append(name, obj.file.rawFile);
        i++;
      });
    });
    formData.append('_id', this.recordId);
    this.updateAttachment(formData);
  }

  updateAttachment(formData) {
    this.onlineOffline = navigator.onLine;
    if (this.onlineOffline) {
      this.rawMatService.uploadAttachment(formData).subscribe((response: any) => {
        this.comonSrvc.showSuccessMsg(response.message);
        console.log("prep");
        this.tabs.select('samplepreparationid'); 
      }, err => {
        this.comonSrvc.showErrorMsg(err.message);
      });
    } else {
      const data = formData;
      const data1 = this.fileList;
      this.localStorage.setItem('recordFiles', JSON.stringify(formData));
      this.localStorage.setItem('testOne', JSON.stringify(this.fileList));
    }
  }


   // tabClick($event){
   //      if (!tab.disabled) {
   //          this.active = tab.value;
   //          this.activeTabChange.emit(tab.value);
   //          this.onClick.emit(tab.value);
   //      }
   //  }


}

