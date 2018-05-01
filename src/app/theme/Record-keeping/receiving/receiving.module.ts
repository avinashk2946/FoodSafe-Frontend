import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReceivingRoutingModule} from './receiving-routing.module';
import {SharedModule} from '../../../shared/shared.module';
// import { ChemicalsComponent } from './chemicals/chemicals.component';
// import { PackagingComponent } from './packaging/packaging.component';
// import { ReturnsComponent } from './returns/returns.component';

@NgModule({
  imports: [
    CommonModule,
    ReceivingRoutingModule,
  ],
  declarations: [
  // ChemicalsComponent, PackagingComponent, ReturnsComponent
  ]
})
export class ReceivingModule { }
