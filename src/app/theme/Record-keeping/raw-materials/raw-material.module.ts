import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawmaterialComponent } from './raw-material.component';
import {RawmaterialRoutingModule} from './raw-material-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {SimpleNotificationsModule} from 'angular2-notifications';
// import {FormPickerRoutingModule} from '../../form-picker/form-picker-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RawmaterialRoutingModule,
    SharedModule,
    ChartModule,
    SimpleNotificationsModule.forRoot(),
    // FormPickerRoutingModule

  ],
  declarations: [RawmaterialComponent],
  bootstrap: [RawmaterialComponent]
})
export class RawmaterialModule { }
