import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMaterialTableComponent } from './raw-material-table.component';
import {RawMaterialTableRoutingModule} from './raw-material-table-routing.module';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialTableRoutingModule,
    SharedModule
  ],
  declarations: [RawMaterialTableComponent]
})
export class RawMaterialTableModule { }
