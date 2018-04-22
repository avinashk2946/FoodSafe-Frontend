import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),FormsModule,
    ReactiveFormsModule,
    SelectModule   
  ],
  declarations: [DynamicFormComponent],
  bootstrap: [DynamicFormComponent]
})
export class DynamicFormModule { }
