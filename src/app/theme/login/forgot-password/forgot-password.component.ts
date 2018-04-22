import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [LoginService,ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {

  frgtPwdForm: FormGroup;
  // companyId: string;
  isFetchConfig: Boolean;

  constructor(private fb: FormBuilder, private loginSrvc: LoginService,
    private forgotpasswordservice:ForgotPasswordService,)
     { 
       this.CreateForm();
  }


  public email:string;
  public mailsent:boolean=false;
  submitted: boolean = false;


  ngOnInit() {
  }
    // this.onFetchConfig(this.companyId);
   public CreateForm(){
      this.frgtPwdForm = this.fb.group({
        'username': ['', [Validators.required]],
      })
  }

  onFetchConfig(companyId) {

  }

  onSubmit():void {
    this.submitted=true;
      if (this.frgtPwdForm.valid) {
      this.forgotpasswordservice.create({'email':this.email})
      console.log("service call")
      // .then()=>{
       this.mailsent=true;
       // }
    }
  }
}