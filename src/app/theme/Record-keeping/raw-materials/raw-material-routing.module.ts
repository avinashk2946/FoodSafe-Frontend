import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'RawMaterials',
      status: false
    },
    children: [
      {
        path: 'rawmaterial',
        loadChildren: './rawmaterial/rawmaterial.module#RawMaterialModule'
      },
      {
        path: 'raw-material-details',
        loadChildren: './raw-material-details/raw-material-details#RawMaterialDetailsModule'
      },
      {
        path: 'raw-material-table',
        loadChildren: './raw-material-table/raw-material-table.module#RawMaterialTableModule'
      },
      // {
      //   path: 'validation',
      //   loadChildren: './form-validation/form-validation.module#FormValidationModule'
      // },
      // {
      //   path: 'picker',
      //   loadChildren: './form-picker/form-picker.module#FormPickerModule'
      // },
      // {
      //   path: 'select',
      //   loadChildren: './form-select/form-select.module#FormSelectModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }
