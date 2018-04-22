import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { CommonService } from '../../../common/common.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {
  frgtPwdForm: FormGroup;
  constructor(private fb: FormBuilder, private _router: Router,private forgotpasswordservice:ForgotPasswordService, private comonSrvc: CommonService)
     { 
       this.CreateForm();
      }
  public mailsent:boolean=false;
  submitted: boolean = false;
  public validate: any = [];
  // emailPattern: string | RegExp = "[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.[a-zA-Z0–9-.]";;
  ngOnInit() {
  }
  public CreateForm(){
     
      this.frgtPwdForm = this.fb.group({
        'email': ['', [Validators.required, Validators.email]]
      })
  }
  message: string;
  
  onSubmit(email: string) {
    this.submitted=true;
    if (this.frgtPwdForm.valid) {
      this.forgotpasswordservice.create(email).subscribe((resData: any) => {
       this.mailsent=true;
       this.message= 'Please check your mail';
        this.comonSrvc.showSuccessMsg(resData.message);
        this._router.navigate(['/login']);
       }, (errData:any) => {
         console.error("Error in service call",errData.error);
         this.comonSrvc.showErrorMsg(errData.error.message);
        });
      
    }
    else{
      this.message= 'This is not a valid email address, please enter a valid one.';
      }
  };
}