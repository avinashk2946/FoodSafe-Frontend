import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import * as _ from 'lodash';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { DynamicFormService } from './dynamic-form.service';
import { API_ACTIONS } from '../../../common/common.constant';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
  providers: [DynamicFormService]
})
export class DynamicFormComponent implements OnInit {
  //formTypes = [{ "name": "QMR-14", "_id": "QMR-14" }];
  inputTypes = [
    { "name": "Text", "_id": "Text" },
    { "name": "DropDown", "_id": "DropDown" },
    { "name": "Radio", "_id": "Radio" },
    { "name": "TextArea", "_id": "TextArea" }
  ];
  dataPoints = [
    { "name": "Country", "_id": "Country" },
    { "name": "City", "_id": "City" },
    { "name": "State", "_id": "State" },
    { "name": "District", "_id": "District" }
  ];
  //unitTypes = [{ "name": "Gram", "_id": "Gram" }, { "name": "Kilo", "_id": "Kilo" }, { "name": "Temp (C)", "_id": "Temp-C" }, { "name": "Temp (F)", "_id": "Temp-F" }];
  required = [{ "name": "True", "_id": "true" }, { "name": "False", "_id": "false" }];

  public columns: Array<string>;
  public rows: Array<object>;
  public items: Array<object>;
  public showTable: Boolean;
  public formTableRows: Array<number>;
  public finalObj: Object;
  public myData: Object;
  public input: Object;
  public formData: Object;
  public dynamicFormId: String;
  public userData : Object;
  public formTypes : Array<object>;
  public unitTypes : Array<object>;
  
  constructor(private fb: FormBuilder, private dynamicFormSrvc: DynamicFormService,
    protected localStorage: AsyncLocalStorage, public router: Router, public route: ActivatedRoute) {
    this.showTable = false;
    this.formTableRows = [];
    this.finalObj = {};
    this.myData = null;
    this.input = {};
    this.dynamicFormId = null;
    
  }

  ngOnInit() {
    this.localStorage.getItem('user').subscribe((result) => {
      this.userData = result.user;
    });
    this.getFormTypes();
    this.getUnitTypes();
   }

  //Function to get Form Names to be binded inside dropdown
  getFormTypes(){
    try {
      const modalName= API_ACTIONS.generic_masters.formTypes;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.formTypes = response.data;  
      }, err => {
        this.formTypes =[];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get Form Names to be binded inside dropdown
  getUnitTypes(){
    try {
      const modalName= API_ACTIONS.generic_masters.unitTypes;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.unitTypes = response.data;  
      }, err => {
        this.unitTypes =[];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  resetDynamicFormCreation(){
    this.showTable = false;
    this.myData = "";
    this.finalObj = {};
    this.formTableRows = [];
    this.input = {};
  }

  //Function for saving/updating the Dynamic Form
  onSubmit(event, data, isFormValid) {
    try {
      if (!isFormValid) {//Reset button click
        this.resetDynamicFormCreation();
      }
      else {
        const labels = [];
        for (let key in data) {
          if (key == "config") continue;
          for (let item in data[key]) {
            if (item == "label") {
              labels.push(data[key][item]);
              break;
            }
          }
        }
        const reqObject = {};
        reqObject["labels"] = labels;
        reqObject["formTypeId"] = data.config.formTypeId;
        reqObject["unitTypeId"] = data.config.unitTypeId;
        reqObject["companyId"] = "5ae44f77f0645c06c8179cce";        
        reqObject["status"] = true;
        reqObject["formMetaData"] = _.omit(data, 'config');
        this.myData = JSON.stringify(reqObject);//it is used for displaying data into html
        //make api call to save/update the form data
        if (this.dynamicFormId == null) {
          reqObject["createdBy"] = this.userData["_id"];
          reqObject["createdDate"] = new Date().toISOString();
          this.dynamicFormSrvc.saveDynamicForm(reqObject).subscribe((response: any) => {
            this.dynamicFormSrvc.showSuccessMsg(response.message);
          }, err => {
            this.dynamicFormSrvc.showErrorMsg(err.message);
          });
        }
        else {
          reqObject["modifiedDate"] = new Date().toISOString();
          reqObject["modifiedBy"] = data.config.formTypeId;
          this.dynamicFormSrvc.updateDynamicForm(this.dynamicFormId, reqObject).subscribe((response: any) => {
            this.dynamicFormSrvc.showSuccessMsg(response.message);
          }, err => {
            this.dynamicFormSrvc.showErrorMsg(err.message);
          });
        }
        this.resetDynamicFormCreation();
      }
    } catch (error) {
      console.log(error);
    }
  }

  formTable(event, data) {
    this.finalObj = {
      "config": {}
    };
    this.showTable = false;
    this.formTableRows = [];
    this.input = {};
    if (!data.formTypeId) return alert("Please Select Form Name");
    if (!Number(data.columns)) return alert("You can enter only numbers");
    this.finalObj["config"]["formTypeId"] = data.formTypeId;
    this.finalObj["config"]["unitTypeId"] = data.cellUnitTypeId;
    for (let index = 0; index < data.columns; index++) {
      this.formTableRows.push(index);
      this.finalObj["Cell_" + index] = {};
      this.finalObj["Cell_" + index]["required"] = false;
      this.finalObj["Cell_" + index]["readOnly"] = false;
      this.finalObj["Cell_" + index]["name"] = "";
      this.finalObj["Cell_" + index]["inputType"] = "Text";
      this.finalObj["Cell_" + index]["formula"] = "";
      this.finalObj["Cell_" + index]["required"] = "true";
    }
    this.showTable = true;
  }

  formTypeSelected(value) {
    if (value) {
      //make api call to search the dynamic form data whether it is already exists or not
      const reqObject = { "formTypeId": value._id };
      this.dynamicFormSrvc.searchDynamicForm(reqObject).subscribe((response: any) => {
        if (response.data.length == 1) {
          //asign the existing saved dynamic form id for the particular company
          this.dynamicFormId = response.data[0]._id;
        }
      }, err => {
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    }
  }

  dataSourceSelected(value) {
    console.log(value);
  }

  inputTypeSelected(value) {
    console.log(value);
  }

  onFormulaEntered(data, index) {
    this.finalObj["Cell_" + index]["readOnly"] = Boolean(data['Cell_' + index].formula);
  }
}


