import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordListComponent } from './record-list.component';
import {RecordListRoutingModule} from './record-list-routing.module'
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {TagInputModule} from 'ngx-chips';
@NgModule({
  imports: [
    CommonModule,
    RecordListRoutingModule,
    NgxDatatableModule,
    TagInputModule
  ],
  declarations: [RecordListComponent],
  bootstrap:[RecordListComponent]
})
export class RecordListModule { }
