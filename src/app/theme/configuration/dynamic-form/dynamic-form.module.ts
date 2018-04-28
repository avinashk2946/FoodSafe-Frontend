import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SelectModule } from 'ng-select';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(), FormsModule,
    ReactiveFormsModule,
    //SelectModule,
    NgSelectModule
  ],
  declarations: [DynamicFormComponent],
  bootstrap: [DynamicFormComponent],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Items not found',
        addTagText: 'Add item',
        typeToSearchText: 'Type to search',
        loadingText: 'Loading...',
        clearAllText: 'Clear all'
      }
    }
  ]
})
export class DynamicFormModule { }
