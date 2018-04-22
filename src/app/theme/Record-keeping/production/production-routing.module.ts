import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
        redirectTo : 'qmr-14',
        pathMatch : 'full'
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
