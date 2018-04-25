import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightCheckComponent } from './weight-check.component';
import { WeightCheckRoutingModule } from './weight-check-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DynamicFormModule } from '../../../render-dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    WeightCheckRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    DynamicFormModule
  ],
  declarations: [WeightCheckComponent],
  bootstrap: [WeightCheckComponent]
})
export class WeightCheckModule { }
