import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagingComponent } from './packaging.component';
import { PackagingRoutingModule } from './packaging-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    PackagingRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [PackagingComponent],
  bootstrap: [PackagingComponent]
})
export class PackagingModule { }
