import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplePreparationComponent } from './sample-preparation.component';
import { SamplePreparationRoutingModule } from './sample-preparation-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    CommonModule,
    SamplePreparationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [SamplePreparationComponent],
  bootstrap: [SamplePreparationComponent]
})
export class SamplePreparationModule { }
