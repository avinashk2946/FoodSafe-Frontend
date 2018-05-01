import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProdcutionRoutingModule} from './production-routing.module';
import {SharedModule} from '../../../shared/shared.module';
// import { ChemicalsComponent } from './chemicals/chemicals.component';
// import { PackagingComponent } from './packaging/packaging.component';
// import { ReturnsComponent } from './returns/returns.component';



@NgModule({
  imports: [
    CommonModule,
    ProdcutionRoutingModule
  ],
  declarations: [
  // ChemicalsComponent, PackagingComponent, ReturnsComponent
  ]
})
export class ProductionModule { }
