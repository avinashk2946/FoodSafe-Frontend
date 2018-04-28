import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleCollectionComponent } from './sample-collection.component';
import { SampleCollectionRoutingModule } from './sample-collection-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    SampleCollectionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgSelectModule
  ],
  declarations: [SampleCollectionComponent],
  bootstrap: [SampleCollectionComponent]
})
export class SampleCollectionModule { }
