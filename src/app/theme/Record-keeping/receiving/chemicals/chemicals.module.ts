import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChemicalsComponent } from './chemicals.component';
import { ChemicalsRoutingModule } from './chemicals-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    ChemicalsRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [ChemicalsComponent],
  bootstrap: [ChemicalsComponent]
})
export class ChemicalsModule { }
