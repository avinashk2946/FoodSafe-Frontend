import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';


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
import { UploaddataService } from '../../../../service/uploaddata.service';
import { File } from '../../../../classes/file';

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
  fileList = [
    {'title':'Bill of Lading',"attachmentList":[{attachment:''}],'name':'billOfLanding'},
    {'title':'Commercial Invoice',"attachmentList":[{attachment:''}],'name':'commercialInvoice'},
    {'title':'Packing list',"attachmentList":[{attachment:''}],'name':'packingList'},
    {'title':'COA',"attachmentList":[{attachment:''}],'name':'coa'},
    {'title':'CCP verification records',"attachmentList":[{attachment:''}],'name':'ccpVerification'},
    {'title':'Environmental Monitoring records',"attachmentList":[{attachment:''}],'name':'environmentalMonitoring'},
    {'title':'Other Supporting records',"attachmentList":[{attachment:''}],'name':'otherSupporting'}
  ];
  recordId : any = '';
  recordDetails:any = {};
  constructor(
    private fb: FormBuilder,
    public rawMatService: RawMaterialService,
    public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage,
    public router: Router,
    public http: Http,
    public uploaddataservice: UploaddataService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe( params => {
        this.recordId = params.id;
        this.getRecordDetails();
      });
  }

  ngOnInit() {
    
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
  uploadFile() {
    const formData: any = new FormData();
    this.fileList.forEach(element => {
      console.log(element.attachmentList);
      let i = 1;
      let name =  element.name;
      element.attachmentList.forEach(obj => {
        name = name+i;
        formData.append(name, obj.attachment[0]);
        i++;
      })
    });
    formData.append('_id','5aa821d27cdb9a0ee929ed52');
    console.log(formData);

    // let fileList: FileList = event.target.files;
    // console.log("FileList   ", filesAddForm.value.files);
    // const formData: any = new FormData();
    // const files: Array<File> = filesAddForm.value.files;
    // console.log("uploaded", files);

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("uploads[]", files[i], files[i]['name']);
    // }
    // console.log('form data variable :   ' + formData.toString());
    this.http.post('http://ec2-18-216-185-118.us-east-2.compute.amazonaws.com:3000/record/attachment', formData)
      // .map(files => {
      //   console.log("file map success");
      //   files.json()

      // })
      .subscribe(files => {
        console.log('files  subscribe success', files)
      })
  }






}
