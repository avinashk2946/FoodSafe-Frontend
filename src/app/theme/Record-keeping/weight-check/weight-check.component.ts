import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from   '../../../render-dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../../../render-dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormulaService } from '../../../render-dynamic-form/services/formula.service';

@Component({
  selector: 'app-returns',
  template: `
  <div class="app">
  <dynamic-form
    [config]="config"
    [data]="data"
    [footerConfig]="footerConfig"
    [labelConfig]="labelConfig"
    #form="dynamicForm"
    (submit)="submit($event)">
  </dynamic-form>
  {{ form.valid }}
  {{ form.value | json }}
</div>
  `,
  styleUrls: ['./weight-check.component.scss']
})
export class WeightCheckComponent implements AfterViewInit,OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  headerConfig:FieldConfig[];
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Time',
      name: 'time',
      
      dataType:"date",
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Bag1',
      dataType:"number",
      value:0,
      name: 'bag1',
      placeholder: 'b',
      validation: []
    },
    {
      type: 'input',
      label: 'Bag2',
      name: 'bag2',
      value:0,
      dataType:"number",
      placeholder: 'b',
      validation: []
    },
    {
      type: 'input',
      label: 'Bag3',
      name: 'bag3',
      dataType:"number",
      placeholder: 'b',
      value:0,
      validation: []
    },
    {
      type: 'input',
      label: 'Bag4',
      name: 'bag4',
      dataType:"number",
      placeholder: 'b',
      value:0,
      validation: []
    },
    {
      type: 'select',
      label: 'tests',
      name: 'compliencetest',
      options:["c","nc","na"],
      placeholder: '',
      validation: [Validators.required]
    },
    {
      type: 'select',
      label: 'tests xyz',
      name: 'test2',
      options:["c","nc","na"],
      placeholder: '',
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Average',
      name: 'average',
      dataType:"number",
      disabled:true,
      placeholder: 'avg',
      formula:"avg(bag1, bag2 , bag3 , bag4)",
      validation: []
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      disabled:true
    }
  ];
  footerConfig:FieldConfig[]=[{
    type: 'input',
    label: 'Final Average',
    name: 'finalAverage',
    dataType:"number",
    value:0,
    disabled:true,
    placeholder: 'final avg',
    formula:"avg(avg(colSum(bag1)), avg(colSum(bag2)) , avg(colSum(bag3)) , avg(colSum(bag4)))",
    validation: []
  }];
  labelConfig:FieldConfig[]=[];

  data=[];
  constructor(private _formulaService:FormulaService){

  }

  ngOnInit(){
    this.labelConfig=this.config.map(i=>({...i,type:'label'}));
    this._formulaService.dataChange$.subscribe(flag=>{
      this.data=this._formulaService.data;
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

  submit(value: {[name: string]: any}) {
    console.log('current row value',value);
    this._formulaService.setIsDataChanged([...this.data,value])
  }

}
