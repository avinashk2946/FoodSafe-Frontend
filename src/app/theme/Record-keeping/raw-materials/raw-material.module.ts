import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawmaterialComponent } from './raw-material.component';
import {RawmaterialRoutingModule} from './raw-material-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SelectModule} from 'ng-select';


@NgModule({
  imports: [
    CommonModule,
    RawmaterialRoutingModule,
    SharedModule,
    ChartModule,
    FormsModule,ReactiveFormsModule,
    SelectModule,
    SimpleNotificationsModule.forRoot(),

  ],
  declarations: [RawmaterialComponent],
  bootstrap: [RawmaterialComponent]
})
export class RawmaterialModule { }
