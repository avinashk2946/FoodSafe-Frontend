import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `
  <button class="btn btn-primary" (click)="showTable=false">Add New</button>
  <table class="table" *ngIf="showTable">
  <thead>
      <tr>
          <th *ngFor="let f of config;">{{f.label}}</th>
      </tr>
  </thead>
  <tbody>
      <tr *ngFor="let d of data">
          <td *ngFor="let k of d | iterable"> {{d[k]}}</td>
          <td><button class="btn btn-primary" (click)="showTable=false;form.value=d">Edit</button></td>
      </tr>
  </tbody>
</table>



<form *ngIf="!showTable" [formGroup]="form" (submit)="handleSubmit($event)">
<ng-container *ngFor="let field of config;" dynamicField [config]="field" [group]="form">
</ng-container>
</form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit {
  showTable: boolean = true;
  @Input()
  config: FieldConfig[] = [];

  @Input()
  footerConfig: FieldConfig[] = [];
  @Input()
  data = [];
  @Input()
  labelConfig: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls() { return this.config.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    this.showTable = true;
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}
