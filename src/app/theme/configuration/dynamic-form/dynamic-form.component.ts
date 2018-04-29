import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import * as _ from 'lodash';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { DynamicFormService } from './dynamic-form.service';
import { API_ACTIONS, GLOBAL_PROPERTIES, Master_Data } from '../../../common/common.constant';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
  providers: [DynamicFormService]
})
export class DynamicFormComponent implements OnInit {

  dataPoints = [
    { "name": "Country", "_id": "Country" },
    { "name": "City", "_id": "City" },
    { "name": "State", "_id": "State" },
    { "name": "District", "_id": "District" }
  ];
  operations = [{ "name": "avg", "_id": "avg" }, { "name": "sum", "_id": "sum" }];
  display = "none";

  public items: Array<object>;
  public showTable: Boolean;
  public formTableRows: Array<string>;
  public finalObj: Object;
  public myData: Object;
  public input: Object;
  public formData: Object;
  public dynamicFormId: String;
  public userData: Object;
  public formTypes: Array<object>;
  public unitTypes: Array<object>;
  public inputTypes: Array<object>;
  public validations: Array<object>;
  public plants: Array<object>;
  public formula: Object;
  public cellList: any;

  constructor(private fb: FormBuilder, private dynamicFormSrvc: DynamicFormService,
    protected localStorage: AsyncLocalStorage, public router: Router, public route: ActivatedRoute) {
    this.showTable = false;
    this.formTableRows = [];
    this.finalObj = {};
    this.myData = null;
    this.input = {};
    this.dynamicFormId = null;
    this.formula = {};
  }

  ngOnInit() {
    this.localStorage.getItem('user').subscribe((result) => {
      this.userData = result.user;
    });
    this.getFormTypes();
    this.getUnitTypes();
    this.getInputTypes();
    this.getValidations();
    this.getPlants();
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

  //Function to get Form Names to be binded inside dropdown
  getUnitTypes() {
    try {
      const modalName = API_ACTIONS.generic_masters.unitTypes;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.unitTypes = response.data;
      }, err => {
        this.unitTypes = [];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get Input Type to be binded inside dropdown
  getInputTypes() {
    try {
      const modalName = API_ACTIONS.generic_masters.inputTypes;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.inputTypes = response.data;
      }, err => {
        this.inputTypes = [];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get validations list to be binded inside dropdown
  getValidations() {
    try {
      const modalName = API_ACTIONS.generic_masters.validations;
      this.dynamicFormSrvc.getMasterData(modalName).subscribe((response: any) => {
        //this.dynamicFormSrvc.showSuccessMsg(response.message);
        this.validations = response.data;
      }, err => {
        this.validations = [];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get plants list to be binded inside dropdown
  getPlants() {
    try {
      this.dynamicFormSrvc.getPlants().subscribe((response: any) => {
        this.plants = response.data;
      }, err => {
        this.plants = [];
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  resetDynamicFormCreation() {
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
        let isFormDataValid = true;
        const reqObject = {};
        reqObject["formMetaData"] = [];
        const labels = [];
        for (let key in data) {
          if (!isFormDataValid) break;
          if (key == "config") continue;
          reqObject["formMetaData"].push(data[key]);
          for (let item in data[key]) {
            if(item == "input"){
              delete data[key][item];
            }
            if (item == "label") {
              if (data[key][item]) {
                labels.push(data[key][item]);
              }
              else {
                isFormDataValid = false;
              }
              break;
            }
          }
        }
        if (!isFormDataValid) return alert("Please Enter labels for all cells");
        reqObject["labels"] = labels;
        reqObject["formTypeId"] = data.config.formTypeId;
        reqObject["plantId"] = data.config.plantId;
        reqObject["companyId"] = GLOBAL_PROPERTIES.Company_Id;
        reqObject["status"] = true;
        //reqObject["formMetaData"] = _.omit(data, 'config');
        this.myData = JSON.stringify(reqObject);//it is used for displaying data into html
        console.log(this.myData);
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

  getDataType(input) {
    try {
      let output;
      switch (input) {
        case "Date":
        case "Date Time":
          output = "date";
          break;
        case "Radio Buttons":
          output = "radio";
          break;
        case "Number":
          output = "number";
          break;
        case "Text":
          output = "text";
          break;
        case "Select":
        case "Text Area":
        default:
          output = null;
          break;
      }
      return output;
    } catch (error) {
      console.log(error);
      return "string";
    }
  }

  getFieldType(input){
    try {
      let output;
      switch (input) {
        case "Text":
        case "Date":
        case "Date Time":
        case "Radio Buttons":
        case "Number":
          output = "input";
          break;
        case "Select":
        case "Text Area":
        default:
          output = input;
          break;
      }
      return output;
    } catch (error) {
      console.log(error);
      return "string";
    }

  }

  formTable(event, data) {
    this.finalObj = {
      "config": {}
    };
    this.showTable = false;
    if (!data.formTypeId) return alert("Please Select Form Type");
    if (!data.plantId) return alert("Please Select Plant");
    if (!Number(data.columns)) return alert("You can enter only numbers");
    this.finalObj["config"]["formTypeId"] = data.formTypeId;
    this.finalObj["config"]["plantId"] = data.plantId;
    this.searchDynamicForm(this.finalObj["config"]);//make this function call async, to verify whether template alraedy exists for this combination, if yes assign dynamic form id to perform update information
    for (let index = 0; index < data.columns; index++) {
      const keyName = "Cell_" + (index + 1);
      this.formTableRows.push(keyName);
      this.finalObj[keyName] = {};
      this.finalObj[keyName]["label"] = null;
      this.finalObj[keyName]["value"] = null; // default null, it will used for setting default data for cell
      this.finalObj[keyName]["dataType"] = "string"; //based on input 
      this.finalObj[keyName]["disabled"] = false; // if formula entered value will be true
      this.finalObj[keyName]["name"] = keyName;// for assigning to html element attributes
      this.finalObj[keyName]["id"] = keyName;//for assigning to html element attributes
      this.finalObj[keyName]["input"] = Master_Data.dynamicForm.default.inputTypeName; //Input type
      this.finalObj[keyName]["formula"] = null; // default null
      this.finalObj[keyName]["validation"] = [Master_Data.dynamicForm.default.validationName]; // default required , multi select
      this.finalObj[keyName]["unitType"] = Master_Data.dynamicForm.default.unitTypeName; // default N/A
    }
    this.input = {};
    this.cellList = this.formTableRows;
    this.showTable = true;
  }

  searchDynamicForm(input) {
    try {
      //make api call to search the dynamic form data whether it is already exists or not
      const reqObject = { "formTypeId": input.formTypeId, "companyId": GLOBAL_PROPERTIES.Company_Id, "plantId": input.plantId };
      this.dynamicFormSrvc.searchDynamicForm(reqObject).subscribe((response: any) => {
        if (response.data.length == 1) {
          //asign the existing saved dynamic form id for the particular company
          this.dynamicFormId = response.data[0]._id;
        }
      }, err => {
        this.dynamicFormSrvc.showErrorMsg(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  formTypeSelected(value) {
    if (value) {
    }
  }

  dataSourceSelected(value) {
    console.log(value);
  }

  inputTypeSelected(value, index) {
    if (!value) value = {};
    this.finalObj[index]["type"] = this.getFieldType(value.name);
    this.finalObj[index]["dataType"] = this.getDataType(value.name);
  }

  onChangeUnitType(value, index) {

  }

  onFormulaEntered(data, index) {
    this.finalObj[index]["disabled"] = Boolean(data[index].formula);
  }

  openFormulaPopup(index) {
    //alert(index);
    this.display = 'block';
    this.formula["selectedCell"] = index;
    return false;
  }

  onCloseHandled() {
    this.formula = {};
    this.display = 'none';
  }

  onChangeOperation(selectedItem, data) {

  }

  onChangeSelectCell(selectedItem, data) {

  }

  applyFormula(data) {
    //console.log(data);
    let formula = "";
    if (data.operation) {
      formula = data.operation + '(';
    }
    else {
      return alert("Please select operation");
    }
    if (data.cells.length > 0) {
      /*
      let labels = [];
      data.cells.forEach(item => {
        labels.push(this.finalObj[item].label);
      });
      */
      formula = formula + data.cells.join() + ')';
      this.finalObj[data.selectedCell].formula = formula;
    }
    this.onCloseHandled();
  }

}


