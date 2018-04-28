import {
  Component, ElementRef, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, Directive,
  Renderer, AfterViewInit
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';


import { FileUploader } from 'ng2-file-upload';
import { Http } from '@angular/http';
import { HttpEventType } from '@angular/common/http';


import { Router, ActivatedRoute } from '@angular/router';
import { TabsSevice } from './tabs.service';
import { RawMaterialService } from '../raw-material.service';
import { CommonService } from '../../../../common/common.service';
import { GLOBAL_PROPERTIES } from '../../../../common/common.constant';
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


export class DocumentUploadComponent implements OnInit, AfterViewInit {

  @ViewChild('tabs')
  private tabs: any;
  currentOrientation = 'horizontal';

  constructor(private fb: FormBuilder, private tabService: TabsSevice,
    public rawMatService: RawMaterialService, public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage,
    public router: Router, public http: Http,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer
  ) {

    this.route.params.subscribe(params => {
      this.recordId = params.id;
      this.getRecordDetails();
    });
  }

  public onlineOffline: boolean = navigator.onLine;
  attchmentList = [{ attachment: '' }];
  uploader: FileUploader = new FileUploader({});

  attachmentList: FileUploader = new FileUploader({});

  existingImageData = {
    'billOfLanding': [], 'commercialInvoice': [], 'packingList': [], 'coa': [],
    'ccpVerification': [], 'environmentalMonitoring': [], 'otherSupporting': []
  };

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

  dataForm: FormGroup;
  UploadFiles: any = '';

  public files: File[];
  public filesAddForm: FormGroup;
  color: any;

  private nativeElement: any;
  private elementref: ElementRef;


  ngOnInit() {
    // this.getRecordDetails();
  }

  ngAfterViewInit(): void {
    this.tabService.sendMessage(this.tabs);
  }

  onNext() {
    this.tabs.select('samplepreparationid');
    this.attachmentList = new FileUploader({});
  }

  onExit() {
    this.router.navigateByUrl('/recordkeeping/raw-matrial');
  }
  // this.router.navigate(['../record-list/record-list.module#RecordListModule']);

  getRecordDetails() {
    this.rawMatService.getRecordData(this.recordId).subscribe((response: any) => {
      this.recordDetails = response.data[0];
      this.convertImageDatatoShowableData();
      this.localStorage.setItem('recordDetails', this.recordDetails).subscribe(() => { }, () => { });
      if (this.recordDetails.isSetDocument === true) {
        const color = this.el.nativeElement.querySelector('#documentUploadid1');
        this.renderer.setElementStyle(color, 'background', '#71c02c');
      }

      if (this.recordDetails.isSamplePreparation === true) {
        const color = this.el.nativeElement.querySelector('#samplepreparationid');
        this.renderer.setElementStyle(color, 'background', '#71c02c');
      }

      if (this.recordDetails.samplecollection === true) {
        const color = this.el.nativeElement.querySelector('#samplecollectionid');
        this.renderer.setElementStyle(color, 'background', '#71c02c');
      }

      if (this.recordDetails.qualityanalysis === true) {
        const color = this.el.nativeElement.querySelector('#qualityanalysisid');
        this.renderer.setElementStyle(color, 'background', '#71c02c');
      }

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
      this.getRecordDetails();
      this.attachmentList = new FileUploader({});
    }, err => {
      this.comonSrvc.showErrorMsg(err.message);
    });
  }

  convertImageDatatoShowableData() {
    this.existingImageData.billOfLanding = [];
    for (let i = 0; i < this.recordDetails.billOfLanding.length; i++) {
      const tempobj = {
        name: this.recordDetails.billOfLanding[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.billOfLanding[i]
      };
      this.existingImageData.billOfLanding.push(tempobj);
    }

    this.existingImageData.commercialInvoice = [];
    for (let i = 0; i < this.recordDetails.commercialInvoice.length; i++) {
      const tempobj = {
        name: this.recordDetails.commercialInvoice[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.commercialInvoice[i]
      };
      this.existingImageData.commercialInvoice.push(tempobj);
    }

    this.existingImageData.packingList = [];
    for (let i = 0; i < this.recordDetails.packingList.length; i++) {
      const tempobj = {
        name: this.recordDetails.packingList[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.packingList[i]
      };
      this.existingImageData.packingList.push(tempobj);
    }

    this.existingImageData.coa = [];
    for (let i = 0; i < this.recordDetails.coa.length; i++) {
      const tempobj = {
        name: this.recordDetails.coa[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.coa[i]
      };
      this.existingImageData.coa.push(tempobj);
    }

    this.existingImageData.ccpVerification = [];
    for (let i = 0; i < this.recordDetails.ccpVerification.length; i++) {
      const tempobj = {
        name: this.recordDetails.ccpVerification[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.ccpVerification[i]
      };
      this.existingImageData.ccpVerification.push(tempobj);
    }

    this.existingImageData.environmentalMonitoring = [];
    for (let i = 0; i < this.recordDetails.environmentalMonitoring.length; i++) {
      const tempobj = {
        name: this.recordDetails.environmentalMonitoring[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.environmentalMonitoring[i]
      };
      this.existingImageData.environmentalMonitoring.push(tempobj);
    }

    this.existingImageData.otherSupporting = [];
    for (let i = 0; i < this.recordDetails.otherSupporting.length; i++) {
      const tempobj = {
        name: this.recordDetails.otherSupporting[i].split('_')[1],
        imageurl: GLOBAL_PROPERTIES.BASE_API_URL + '' + this.recordDetails.otherSupporting[i]
      };
      this.existingImageData.otherSupporting.push(tempobj);
    }

  }

}
