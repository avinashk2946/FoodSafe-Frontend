import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormulaService } from '../../services/formula.service';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label *ngIf="!config.hidden">{{ config.label }}</label>
      <input 
        [type]="config.dataType"
        [attr.placeholder]="config.placeholder"
        [class.disabled]="config.disabled"
        [hidden]="config.hidden"
        [value]="config.dataType=='time'?getTime():(config.value || calculate(config.formula) || group.value[config.name])"
        [formControlName]="config.name">
    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  constructor(private _formulaService: FormulaService) {
    console.log(this.group);
  }
  getTime(){
    return `${new Date().getHours()}:${new Date().getMinutes()}`;
  }
  calculate(exp: string) {
    let dataPoint={};
    if (/colSum/.test(exp)) {
      
      let result = [], m, rx = /colSum\((.*?)\)/g;
      while ((m = rx.exec(exp)) !== null) {
        result.push(m[1]);
      }
      if(result.length){
        result.forEach(res=>{
          dataPoint[res]=this._formulaService.data.map(d=>d[res])
        })
      }

    }
  
    let val = this._formulaService.calculateFormula(exp, {...this.group.value,...dataPoint})
  
  val && (this.group.value[this.config.name]=val)
  return val;
  }
}
