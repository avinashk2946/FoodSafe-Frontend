import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RawMaterialsRoutingModule} from './raw-material-routing.module';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialsRoutingModule,
  ],
  declarations: [DataTableComponent]
})
export class RawMaterialsModule { }
