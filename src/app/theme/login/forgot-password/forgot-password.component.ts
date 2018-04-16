import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [LoginService]
})
export class ForgotPasswordComponent implements OnInit {

  frgtPwdForm: FormGroup;
  companyId: string;
  isFetchConfig: Boolean;

  constructor(private fb: FormBuilder, private loginSrvc: LoginService) { }

  ngOnInit() {

    this.onFetchConfig(this.companyId);

    this.frgtPwdForm = this.fb.group({
      'username': ['', [Validators.required]]
    });

  }

  onFetchConfig(companyId) {

  }
  onSubmit() {

  }
}
