import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductionComponent} from './production.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Production',
      status: false
    },
    children: [
      {
        path : '',
        component: ProductionComponent,
      },
      {
        path: 'qmr-14',
        loadChildren: './qmr-14/qmr-14.module#QMR14Module'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdcutionRoutingModule { }
