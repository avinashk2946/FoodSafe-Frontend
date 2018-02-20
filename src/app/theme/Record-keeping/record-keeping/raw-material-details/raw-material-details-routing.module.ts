import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RawMaterialDetailsComponent } from './raw-material-details.component';

const routes: Routes = [
  {
    path: '',
    component: RawMaterialDetailsComponent,
    data: {
      title: 'RawMaterialDetails',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialDetailsRoutingModule { }
