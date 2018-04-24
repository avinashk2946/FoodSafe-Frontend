import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public resetPasswordToken: string;
  // public mailsent: boolean=false;
  // submitted: boolean = false;
  // public email:string;
  // public param: string;
  // public message: string;


  constructor(private fb: FormBuilder, private resetpasswordservice:ResetPasswordService, private comonSrvc: CommonService, 
    private route: Router, private aRoute: ActivatedRoute)
     { 
      
      }

  ngOnInit() {
    this.aRoute.queryParams.subscribe((params: Params) => {
      this.resetPasswordToken = params['resetPasswordToken'];
    });
    this.resetPwdForm = this.fb.group({
      'password' : ['', [Validators.required, Validators.minLength(5)]],
      'confirmPassword' : ['', [Validators.required, Validators.minLength(5)]]
     }//, { validator: ifEqual }
     );
   
  }
  public onSubmit(){
    console.log("form submitted!",this.resetPwdForm);
    // if(this.resetPwdForm.valid){
    //   this.resetPwdForm.reset()
    // }
      let formdata=this.resetPwdForm.value;
      formdata.resetPasswordToken=this.resetPasswordToken;
      this.resetpasswordservice.reset(formdata).subscribe(response=>{
        console.log("response",response);
        this.route.navigate(['/login']);
       });
   }
   
 }
// export function ifEqual (c: AbstractControl) {
//   if (c.get('newPassword').value === c.get('confirmPassword').value)
//    { 
//     //  return true;
//     }
//     err => {
     
//         this.comonSrvc.showErrorMsg(err.message);
    
//   }
    
//  }

