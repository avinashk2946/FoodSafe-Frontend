import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMaterialComponent } from './raw-material.component';
import { RawMaterialRoutingModule } from './raw-material-routing.module';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialRoutingModule,
    SharedModule
  ],
  declarations: [RawMaterialComponent]
})
export class RawMaterialModule { }
