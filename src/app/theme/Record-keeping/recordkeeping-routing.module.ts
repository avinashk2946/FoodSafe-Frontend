import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rawmaterial',
      status: false
    },
    children: [
      // {

      //   path: 'rawmaterial',
      //   loadChildren: './Record-keeping/raw-material.module#RawmaterialModule'
      // },
      // {

      //   path: 'rawmaterial/rawmaterialdetails',
      //   loadChildren: './Record-keeping/raw-material.module#RawmaterialModule'
      // },
      // {
      //   path: 'rawmaterialdetails',
      //   loadChildren: './Record-keeping/raw-materials/raw-materials-details/raw-material-details.module#RawmaterialdetailsModule'
      // },
      // {
      //   path: 'rawmaterialtable',
      //   loadChildren: './Record-keeping/raw-materials/raw-materials-details/raw-material-table.module#RawMaterialDetailsModule'
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordKeepingRoutingModule { }
