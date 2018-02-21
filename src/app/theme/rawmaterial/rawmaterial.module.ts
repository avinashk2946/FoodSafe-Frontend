import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawmaterialComponent } from './rawmaterial.component';
import {RawmaterialRoutingModule} from './rawmaterial-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RawmaterialRoutingModule,
    SharedModule
  ],
  declarations: [RawmaterialComponent]
})
export class RawmaterialModule { }
