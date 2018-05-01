import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { DynamicFormService } from '../../configuration/dynamic-form/dynamic-form.service';
import { API_ACTIONS, GLOBAL_PROPERTIES, Master_Data } from '../../../common/common.constant';

@Component({
    selector: 'production',
    templateUrl: './production.html',
    styleUrls: ['./production.scss'],
    providers: [DynamicFormService]
  })
export class ProductionComponent { 
  public formTypes: Array<object>;
  public userData: Object;
  public input: Object;
  constructor(public router: Router,protected localStorage: AsyncLocalStorage, private dynamicFormSrvc: DynamicFormService){
    this.input = {};
  }

  ngOnInit(){
    this.localStorage.getItem('user').subscribe((result) => {
      this.userData = result.user;
    });
    this.getFormTypes();
  }

  //Function to get Form Names to be binded inside dropdown
  getFormTypes() {
    try {
      const modalName = API_ACTIONS.generic_masters.formTypes;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.formTypes = response.data;
      }, err => {
        this.formTypes = [];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  formTypeSelected(input){

  }

  navigateToForm(input){
    if(input.toLowerCase()!="qmr-14") return alert("Form Template not found");
    this.router.navigate(['/recordkeeping/production/'+ input.toLowerCase()]);
  }
 
}