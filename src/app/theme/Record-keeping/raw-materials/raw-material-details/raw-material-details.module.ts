import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMaterialDetailsComponent } from './raw-material-details.component';
import {RawMaterialDetailsRoutingModule} from './raw-material-details-routing.module';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialDetailsRoutingModule,
    SharedModule
  ],
  declarations: [RawMaterialDetailsComponent]
})
export class RawMaterialDetailsModule { }
