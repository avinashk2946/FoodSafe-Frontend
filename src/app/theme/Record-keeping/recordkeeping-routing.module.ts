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
        path: 'raw-matrial',
        loadChildren: './raw-materials/raw-material.module#RawMaterialsModule'
      },
      {
        path: 'production',
        loadChildren: './production/production.module#ProductionModule'
      },
      //  {
      //   path: 'packaging',
      //   loadChildren: './returns/returns.module#ReturnsModule'
      // },
      //  {
      //   path: 'chemicals',
      //   loadChildren: './returns/returns.module#ReturnsModule'
      // },
       {
        path: 'returns',
        loadChildren: './returns/returns.module#ReturnsModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordKeepingRoutingModule { }
