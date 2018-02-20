import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RawMaterialTableComponent} from './raw-material-table.component';

const routes: Routes = [
  {
    path: '',
    component: RawMaterialTableComponent,
    data: {
      title: 'RawMaterialTable',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialTableRoutingModule { }
