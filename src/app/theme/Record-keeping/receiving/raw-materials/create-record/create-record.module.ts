import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecordComponent } from './create-record.component';
import { CreateRecordRoutingModule } from './create-record-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    CommonModule,
    CreateRecordRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [CreateRecordComponent],
  bootstrap: [CreateRecordComponent]
})
export class CreateRecordModule { }
