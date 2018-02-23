import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigurationService } from './configuration.service';
import {ColorPickerService, Rgba} from 'ngx-color-picker';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers:[ConfigurationService]
})
export class ConfigurationComponent {

 loginCofigurationForm : FormGroup;
  loading: boolean = false;
  public themeColor = '#4099ff';
  @ViewChild('fileInput1') fileInput1: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  constructor(private fb : FormBuilder,private ConfigurationSrvc: ConfigurationService) { 
    this.createForm();
  }
  

	/*handleFileSelect(evt){
	  var files = evt.target.files;
	  console.log('files',files);
	  var file = files[0];

	if (files && file) {
	    var reader = new FileReader();

	    reader.onload =this._handleReaderLoaded.bind(this);

	    reader.readAsBinaryString(file);
	}
	}

	_handleReaderLoaded(readerEvt) {
	 var binaryString = readerEvt.target.result;
	        this.base64textString= btoa(binaryString);
	        console.log(btoa(binaryString));
	}*/
  createForm() {

  	this.loginCofigurationForm = this.fb.group({
  		themeColorValue : null,/*
      backgroungImage : ['', Validators.required],
  		logoImage : ['', Validators.required],*/
      backgroungImage :null,
      logoImage:null
  	})
  }
  onBackgroungImageChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.loginCofigurationForm.get('backgroungImage').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  onLogoImageChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.loginCofigurationForm.get('logoImage').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  onSubmit() {
    const formModel = this.loginCofigurationForm.value;
    this.loading = true;
    console.log('this.loginCofigurationForm',this.loginCofigurationForm.value);
    console.log('this.themeColor',this.themeColor);
    /*setTimeout(() => {
      alert('done!');
      this.loading = false;
    }, 1000);*/
  	var requestData={themeColor:this.themeColor,logoImg:this.loginCofigurationForm.value.logoImage,backgroundImg:this.loginCofigurationForm.value.backgroungImage};
    this.ConfigurationSrvc.setLoginPageConfig(requestData).subscribe(
      (resData: any) => {
        this.loading = false;
        this.clearFile();
    }, err => { 
      if (err.status === 401) {
        this.loading = false;
      }
     
    });
  }
  clearFile() {
    this.loginCofigurationForm.get('logoImage').setValue(null);
    this.loginCofigurationForm.get('backgroungImage').setValue(null);
    this.fileInput1.nativeElement.value = '';
    this.fileInput2.nativeElement.value = '';
  }
}
