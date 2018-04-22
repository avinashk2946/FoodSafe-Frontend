import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnsComponent } from './returns.component';
import { ReturnsRoutingModule } from './returns-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    ReturnsRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [ReturnsComponent],
  bootstrap: [ReturnsComponent]
})
export class ReturnsModule { }
