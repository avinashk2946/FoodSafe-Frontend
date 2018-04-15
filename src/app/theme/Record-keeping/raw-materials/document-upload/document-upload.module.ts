import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';

import { SharedModule } from '../../../../shared/shared.module';

import { ChartModule } from 'angular2-chartjs';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'ng-select';
import { FileUploadModule } from 'ng2-file-upload';

import { SamplePreparationComponent } from './sample-preparation/sample-preparation.component';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { QualityAnalysisComponent } from './quality-analysis/quality-analysis.component';
import { MicroAnalysisComponent } from './micro-analysis/micro-analysis.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentUploadRoutingModule,
    SharedModule,
    ChartModule,
    FormsModule, ReactiveFormsModule,
    SelectModule,
    SimpleNotificationsModule.forRoot(),
    FileUploadModule
  ],


  declarations: [
    DocumentUploadComponent,
    SamplePreparationComponent,
    SampleCollectionComponent,
    QualityAnalysisComponent,
    MicroAnalysisComponent,
    SummaryComponent
  ],

  bootstrap: [DocumentUploadComponent]
})
export class DocumentUploadModule { }
