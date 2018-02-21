import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import {ConfigurationRoutingModule} from './configuration-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  declarations: [ConfigurationComponent]
})
export class ConfigurationModule { }
