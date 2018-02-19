import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../service/data.service';
import { LoginService } from './login.service';
import { CommonService } from '../../common/common.service';
import { AuthService } from '../../common/auth.service';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup;
  companyId : string;
  logoUrl : any;
  backgroundImgUrl : any;

  constructor(private _dataService : DataService, private _router : Router, private fb : FormBuilder,private loginSrvc: LoginService,private comonSrvc: CommonService,private locationStrategy: LocationStrategy) { 
    var absUrl = (<any>this.locationStrategy)._platformLocation.location.href;
    var splittedArray = absUrl.split(':')[0].split('/');
    this.companyId = splittedArray[0];
    console.log('this.companyId',this.companyId);
  }

  ngOnInit() {
    //this.logoUrl = "http://localhost/FS_Resource/images/Logo-small-bottom.png";
    this.onFetchConfig(this.companyId);
  	this.loginForm = this.fb.group({
  		'username' : ['', [Validators.required, Validators.minLength(6)]],
  		'password' : ['', [Validators.required, Validators.minLength(6)]]
  	})
  }
  
  onFetchConfig(companyId) {
    this.loginSrvc.fetchConfig(companyId).subscribe(
      (resData: any) => {
      resData = {"logoUrl":"http://localhost/FS_Resource/images/Logo-small-bottom.png","themColor":"","backgroundImgUrl":"http://localhost/FS_Resource/images/pic.png"};
      this.logoUrl = resData.logoUrl;
      this.backgroundImgUrl = resData.backgroundImgUrl;
    }, err => { 
      if (err.status === 401) {
      }
     
    });
  };

  onSubmit() {
    this.loginSrvc.verifyUser(this.loginForm.value).subscribe(
      (resData: any) => {
      console.log('res',resData);
      this.comonSrvc.showSuccessMsg(resData.messageText);
      this._router.navigate(['/admin']);
    }, err => { 
      if (err.status === 401) {
        this.comonSrvc.showErrorMsg(err.messageText);
      }
     
    });
  };

}
