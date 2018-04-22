import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuration',
      status: false
    },
    children: [
      {
        path : '',
        redirectTo : 'dynamic-form',
        pathMatch : 'full'
      },
      {
        path: 'dynamic-form',
        loadChildren: './dynamic-form/dynamic-form.module#DynamicFormModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
