import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'OperatingProcedures',
      status: true
    },
    children: [
      // {
      //   path: 'gfsi',
      //   loadChildren: './gfsi/gfsi.module#GfsiModule'
      // },
      // {
      //   path: 'plant',
      //   loadChildren: './plant-dashboard/plant.module#PlantModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatingProceduresRoutingModule { }
