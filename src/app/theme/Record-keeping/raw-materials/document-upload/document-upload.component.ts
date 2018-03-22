import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
import * as _ from "lodash";
import { AsyncLocalStorage } from 'angular-async-local-storage';

// import { UploaddataService } from '../../../../service/uploaddata.service';
// import { File } from '../../../../classes/file';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: [
    './document-upload.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [RawMaterialService]

})
export class DocumentUploadComponent implements OnInit {

  attchmentList = [{attachment:''}];
  uploader: FileUploader = new FileUploader({});
  fileList = [
    {'title':'Bill of Lading',"attachmentList":new FileUploader({isHTML5: true}),'name':'billOfLanding'},
    {'title':'Commercial Invoice',"attachmentList":new FileUploader({}),'name':'commercialInvoice'},
    {'title':'Packing list',"attachmentList":new FileUploader({}),'name':'packingList'},
    {'title':'COA',"attachmentList":new FileUploader({}),'name':'coa'},
    {'title':'CCP verification records',"attachmentList":new FileUploader({}),'name':'ccpVerification'},
    {'title':'Environmental Monitoring records',"attachmentList":new FileUploader({}),'name':'environmentalMonitoring'},
    {'title':'Other Supporting records',"attachmentList":new FileUploader({}),'name':'otherSupporting'}
  ];
  recordId : any = '';
  recordDetails:any = {};
  dataForm: FormGroup;
  UploadFiles: any = "";

  public files: File[];

  public filesAddForm: FormGroup;
  
  // @Input() recordDetails:any;


  constructor(
    private fb: FormBuilder,
    public rawMatService: RawMaterialService,
    public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage,
    public router: Router,
    public http: Http,
    // public uploaddataservice: UploaddataService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe( params => {
        this.recordId = params.id;
        this.getRecordDetails();
      });
  }

  ngOnInit() {
    window.localStorage.setItem('Rawmatid', '-1');
    this.getRecordDetails();
  }
  getRecordDetails() {
    this.rawMatService.getRecordData(this.recordId).subscribe((response: any) => {
      console.log(response);
      this.recordDetails = response.data[0];
    }, err => { 
      if (err.status === 401) {
      }
    });  
  }
  public addFile(e,list) {
    e.preventDefault();
    list.push({attachment:''});
  }
  delete(e: Event, index: number,list) {
    e.preventDefault();
    // const control = <FormArray>this.filesAddForm.controls['files'];
    // if (control.length > 1) {
    list.splice(index, 1);
    // }
  }
  getFiles(event,item){ 
    console.log(event.target.files);
    item.attachment = event.target.files; 
  } 
  fileSelected(event){ 
    console.log(event);
    // item.attachment = event.target.files; 
  } 
  uploadFile() {
    const formData: any = new FormData();
    console.log(this.fileList);
    this.fileList.forEach(element => {
      console.log(element.attachmentList);
      let i = 1;
      let name =  element.name;
      element.attachmentList.queue.forEach(obj => {
        name = name+i;
        formData.append(name, obj.file.rawFile);
        i++;
      })
    });
    formData.append('_id',this.recordId);
    console.log(formData);
    this.rawMatService.uploadAttachment(formData).subscribe((response: any) => {
      this.comonSrvc.showSuccessMsg(response.message);
    }, err => { 
      this.comonSrvc.showErrorMsg(err.message);
    });  
    

  }
  currentOrientation = 'horizontal';
}
