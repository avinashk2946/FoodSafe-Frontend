import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QMR14Component } from './qmr-14.component';
import { QMR14RoutingModule } from './qmr-14-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DynamicFormModule } from '../../../../render-dynamic-form/dynamic-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    QMR14RoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    SimpleNotificationsModule.forRoot(),
    DynamicFormModule
  ],
  declarations: [QMR14Component],
  bootstrap: [QMR14Component]
})
export class QMR14Module { }
