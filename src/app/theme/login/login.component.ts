import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../service/data.service';
import { LoginService } from './login.service';
import { CommonService } from '../../common/common.service';
import { AuthService } from '../../common/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup;

  constructor(private _dataService : DataService, private _router : Router, private fb : FormBuilder,private loginSrvc: LoginService,private comonSrvc: CommonService) { }

  ngOnInit() {
  	this.loginForm = this.fb.group({
  		'username' : ['', [Validators.required, Validators.minLength(6)]],
  		'password' : ['', [Validators.required, Validators.minLength(6)]]
  	})
  }
  onSubmit() {
    this.loginSrvc.verifyUser(this.loginForm.value).subscribe(res => {
      let resData: any = res;
      console.log('res',resData);
      this.comonSrvc.showSuccessMsg(resData.messageText);
      this._router.navigate(['/admin']);
    }, err => { 
     this.comonSrvc.showErrorMsg(err.messageText);
     this._router.navigate(['/admin']);
    });
  };

}
