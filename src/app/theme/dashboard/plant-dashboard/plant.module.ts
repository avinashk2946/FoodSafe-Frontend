import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantComponent } from './plant.component';
import { PlantRoutingModule } from './plant-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    PlantRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [PlantComponent],
  bootstrap: [PlantComponent]
})
export class PlantModule { }
