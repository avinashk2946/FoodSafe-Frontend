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
  dataForm: FormGroup;
  UploadFiles: any = "";

  public files: File[];

  public filesAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public rawMatService: RawMaterialService,
    public comonSrvc: CommonService,
    protected localStorage: AsyncLocalStorage,
    public router: Router,
    public http: Http,
    public uploaddataservice: UploaddataService
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.dataForm = this.fb.group({
    //   'plant' : ['', [Validators.required]],
    //   'createdDate' : ['', [Validators.required]],
    //   'createdBy' : ['', [Validators.required]],
    //   'suplier' : ['', [Validators.required]],
    //   'broker' : ['', [Validators.required]],
    //   'coo' : ['', [Validators.required]],
    //   'product' : ['', [Validators.required]],
    //   'productCode' : ['', [Validators.required]],
    //   'variety' : ['', [Validators.required]],
    //   'approved' : ['', [Validators.required]],
    //   'kosher' : ['', [Validators.required]],
    //   'nonGMO' : ['', [Validators.required]],
    //   'po' : ['', [Validators.required]],
    //   'containerNo' : ['', [Validators.required]],
    //   'lotNo' : ['', [Validators.required]],
    //   'organic' : ['', [Validators.required]],
    // });

    window.localStorage.setItem('Rawmatid', '-1');

  }
  createForm() {
    this.filesAddForm = this.fb.group({
      files: this.fb.array([
        this.fb.group({
          file: ['',],

        })
      ])
    });
    // ]);    
  }
  public addFile(e: Event) {
    e.preventDefault();
    let files = this.filesAddForm.controls.files as FormArray;
    files.push(
      this.fb.group({
        file: ['',],

      })
    );
  }
  delete(e: Event, index: number) {
    e.preventDefault();
    const control = <FormArray>this.filesAddForm.controls['files'];
    if (control.length > 1) {
      control.removeAt(index);
    }
  }
  uploadFile(filesAddForm, event) {
    let fileList: FileList = event.target.files;
    console.log("FileList   ", filesAddForm.value.files);
    const formData: any = new FormData();
    const files: Array<File> = filesAddForm.value.files;
    console.log("uploaded", files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    this.http.post('http://localhost:3000/record/attachment', formData)
      // .map(files => {
      //   console.log("file map success");
      //   files.json()

      // })
      .subscribe(files => {
        console.log('files  subscribe success', files)
      })
  }






}
