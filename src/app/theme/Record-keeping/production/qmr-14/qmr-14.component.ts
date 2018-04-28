import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { QMR14Service } from './qmr-14.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { FieldConfig } from '../../../../render-dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../../../render-dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormulaService } from '../../../../render-dynamic-form/services/formula.service';

@Component({
  selector: 'qmr-14',
  templateUrl: './qmr-14.html',
  styleUrls: ['./qmr-14.scss'],
  providers: [QMR14Service]
})
export class QMR14Component implements OnInit {
  productionLine = [
    { "label": "Production-1", "code": "P1" },
    { "label": "Production-2", "code": "P2" },
    { "label": "Production-3", "code": "P3" },
    { "label": "Production-4", "code": "P4" }
  ]

  itemCodeData = [
    { "label": "ORGBJCERI48", "code": "I1", "productionLineCode": "P1" },
    { "label": "ORGBJMXFR64", "code": "I2", "productionLineCode": "P1" },
    { "label": "ORGBJTRB48", "code": "I3", "productionLineCode": "P2" },
    { "label": "ORGBJTRB48", "code": "I4", "productionLineCode": "P4" }
  ];

  public formData: Object;
  public itemCode: Array<object>;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  headerConfig: FieldConfig[];
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Time',
      name: 'time',

      dataType: "date",
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Bag1',
      dataType: "number",
      value: 0,
      name: 'bag1',
      placeholder: 'b',
      validation: []
    },
    {
      type: 'input',
      label: 'Bag2',
      name: 'bag2',
      value: 0,
      dataType: "number",
      placeholder: 'b',
      validation: []
    },
    {
      type: 'input',
      label: 'Bag3',
      name: 'bag3',
      dataType: "number",
      placeholder: 'b',
      value: 0,
      validation: []
    },
    {
      type: 'input',
      label: 'Bag4',
      name: 'bag4',
      dataType: "number",
      placeholder: 'b',
      value: 0,
      validation: []
    },
    {
      type: 'select',
      label: 'tests',
      name: 'compliencetest',
      options: ["c", "nc", "na"],
      placeholder: '',
      validation: [Validators.required]
    },
    {
      type: 'select',
      label: 'tests xyz',
      name: 'test2',
      options: ["c", "nc", "na"],
      placeholder: '',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Average',
      name: 'average',
      value: 0,
      dataType: "number",
      disabled: false,
      placeholder: 'avg',
      formula: "avg(bag1, bag2 , bag3 , bag4)",
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      disabled: true
    }
  ];
  footerConfig: FieldConfig[] = [{
    type: 'input',
    label: 'Final Average',
    name: 'finalAverage',
    dataType: "number",
    value: 0,
    disabled: true,
    placeholder: 'final avg',
    formula: "avg(avg(colSum(bag1)), avg(colSum(bag2)) , avg(colSum(bag3)) , avg(colSum(bag4)))",
    validation: []
  }];
  labelConfig: FieldConfig[] = [];

  data = [];

  constructor(private http: HttpClient, private _formulaService: FormulaService) {
    //plant name will be associate with user meta data
    this.formData = { "date": new Date(),"plant" : {"name" : "Front Royal", "code" :"Plant-01"} };
  }

  onSubmit(event, data) {
    console.log(data);
  }

  ngOnInit() {
    this.labelConfig = this.config.map(i => ({ ...i, type: 'label' }));
    this._formulaService.dataChange$.subscribe(flag => {
      this.data = this._formulaService.data;
    })
  }
  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');
  }

  submit(value: { [name: string]: any }) {
    console.log('current row value', value);
    this._formulaService.setIsDataChanged([...this.data, value]);
  }

  productionLineSelected(data) {
    let result = [];
    delete this.formData["itemCode"];//for deleting the pre selected value of brand label dropdown
    this.clearAutoPopulatedData();
    if (data) {
      //creating filter of data based on production line selection, populate btand label dropdown
      this.itemCodeData.forEach(item => {
        if (item.productionLineCode == data.code) {
          result.push(item);
        }
      });
      this.itemCode = result;
    }
  }

  itemCodeSelected(data) {
    if(data){
      this.formData["brandName"] = "BJ's";
      this.formData["productName"] = "BJO Dark Sweet Cherry - 12 x 3 lb";
      this.formData["netWeight"] = "500";
      this.formData["bestBefore"] = "04/25/2021";
      this.formData["dateCodeFormat"] = "MM/DD/YYYY";
      this.formData["UpcCodeBag"] = "UPC-Code-001";
      this.formData["lowLimit"] = "500";
      this.formData["highLimit"] = "3000";
    }
    else{
     this.clearAutoPopulatedData();
    }
    
  }

  clearAutoPopulatedData(){
    this.formData["brandName"] = "";
    this.formData["productName"] = "";
    this.formData["netWeight"] = "";
    this.formData["bestBefore"] = "";
    this.formData["dateCodeFormat"] = "";
    this.formData["UpcCodeBag"] = "";
    this.formData["lowLimit"] = "";
    this.formData["highLimit"] = "";
  }
}


