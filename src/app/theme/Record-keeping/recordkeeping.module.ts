import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecordKeepingRoutingModule} from './recordkeeping-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { RawMaterialListComponent } from './raw-material-list/raw-material-list.component';
import { RawMaterialRowComponent } from './raw-material-row/raw-material-row.component';
import { RawMaterialTableComponent } from './raw-material-table/raw-material-table.component';

@NgModule({
  imports: [
    CommonModule,
    RecordKeepingRoutingModule,
  ],
  declarations: [RawMaterialListComponent, RawMaterialRowComponent, RawMaterialTableComponent]
})
export class RecordKeepingModule { }
