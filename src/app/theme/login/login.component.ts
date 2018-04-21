import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { LoginService } from './login.service';
import { CommonService } from '../../common/common.service';
import { AuthService } from '../../common/auth.service';
import { LocationStrategy } from '@angular/common';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { GLOBAL_PROPERTIES } from './../../common/common.constant';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [LoginService],
  // provider: [LocalStorageService]
})
export class LoginComponent implements OnInit {
  // @LocalStorage() public username:string;

  loginForm: FormGroup;
  companyId: string;
  logoUrl: any;
  backgroundImgUrl: any;
  isFetchConfig: Boolean;
  
  // private logo = require("./assets/images/logo.png");

  user;

  constructor(private _dataService: DataService, private _router: Router, private fb: FormBuilder,
    private loginSrvc: LoginService, private comonSrvc: CommonService, private locationStrategy: LocationStrategy,
    protected localStorage: AsyncLocalStorage) {

    const absUrl = (<any>this.locationStrategy)._platformLocation.location.href;
    const splittedArray = absUrl.split(':')[0].split('/');
    this.companyId = splittedArray[0];
    this.isFetchConfig = false;
    console.log('this.companyId', this.companyId);


  }

  ngOnInit() {

    this.onFetchConfig(this.companyId);

    this.loginForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'password': ['', [Validators.required, Validators.minLength(5)]]
    });

  }
  getDefaultLogoImg(event) {
    this.logoUrl = GLOBAL_PROPERTIES.BASE_API_URL + String('./upload/default-logo.jpg').substr(2);
  }
  onFetchConfig(companyId) {

    this.loginSrvc.fetchConfig(companyId).subscribe(
      (resData: any) => {
        this.isFetchConfig = true;
        this.logoUrl = GLOBAL_PROPERTIES.BASE_API_URL + resData.data[0].logoImg.substr(2);
        this.backgroundImgUrl = resData.data[0].backgroundImg ? GLOBAL_PROPERTIES.BASE_API_URL
          + resData.data[0].backgroundImg.substr(2) : '';
        console.log('resData  ', resData);
        console.log('this.logoUrl  ', this.logoUrl);
        console.log('this.backgroundImgUrl  ', this.backgroundImgUrl);
      }, err => {

      });
  }

  onSubmit() {
    this.loginSrvc.verifyUser(this.loginForm.value).subscribe(
      (resData: any) => {

        console.log('res', resData);
        this.user = resData.data;

        this.localStorage.setItem('user', this.user).subscribe(() => { }, () => { });
        this.comonSrvc.showSuccessMsg(resData.message);

        this._router.navigate(['/dashboard']);

      }, err => {
        if (err.status === 401) {
          this.comonSrvc.showErrorMsg(err.message);
        } else {
          this.comonSrvc.showErrorMsg(err.message);
        }

      });
  }

  onRememberME() {
    this.localStorage.setItem('user', this.user.username).subscribe(() => { });
    this.localStorage.setItem('user', this.user.password).subscribe(() => { });
  }
}
