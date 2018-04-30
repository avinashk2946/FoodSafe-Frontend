import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProdcutionRoutingModule} from './production-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import {ProductionComponent} from './production.component'

@NgModule({
  imports: [
    CommonModule,
    ProdcutionRoutingModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [ProductionComponent],
  bootstrap: [ProductionComponent],
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
export class ProductionModule { }
