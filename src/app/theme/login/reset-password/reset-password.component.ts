import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { CommonService } from '../../../common/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {

  resetPwdForm: FormGroup;
  public token: string;
  public mailsent: boolean=false;
  submitted: boolean = false;
  public email:string;
  public param: string;
  public message: string;


  constructor(private fb: FormBuilder, private resetpasswordservice:ResetPasswordService, private comonSrvc: CommonService, 
    private route: Router, private aRoute: ActivatedRoute)
     { 
      
      }

  ngOnInit() {
    this.aRoute.params.subscribe((param) => {
      if(param.token){
        this.param=param.token;
      }
    });
    this.resetPwdForm = this.fb.group({
      'newPassword' : ['', [Validators.required, Validators.minLength(5)]],
      'confirmPassword' : ['', [Validators.required, Validators.minLength(5)]]
     }, { validator: ifEqual }
     );
    
  }
  public onSubmit(){
      let formdata=this.resetPwdForm.value;
      formdata.token=this.token;
      this.resetpasswordservice.reset(formdata).then(response=>{
        this.route.navigate(['/login']);
       }).catch(error=>{
         this.message="error occured try again";
       });
  
   }
 }
export function ifEqual (c: AbstractControl) {
  if (c.get('newPassword').value === c.get('confirmPassword').value)
   { 
    //  return true;
    }
    err => {
     
        this.comonSrvc.showErrorMsg(err.message);
    
  }
    
 }

