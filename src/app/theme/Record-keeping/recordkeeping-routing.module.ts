import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Record Keeping',
      status: false
    },
    children: [
      {
        path : '',
        redirectTo : '',
        pathMatch : 'full'
      },
      {
        path: 'receiving',
        loadChildren: './receiving/raw-materials/raw-material.module#RawMaterialsModule'
      },
      {
        path: 'production',
        loadChildren: './production/production.module#ProductionModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordKeepingRoutingModule { }
