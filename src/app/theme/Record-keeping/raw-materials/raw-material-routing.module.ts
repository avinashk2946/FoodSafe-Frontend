import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RawmaterialComponent} from './raw-material.component';
// import {FormPickerRoutingModule} from '../../form-picker/form-picker-routing.module';

const routes: Routes = [
  {
    path: '',
    component: RawmaterialComponent,
    // data: {
    //   title: 'Corporate',
    //   icon: 'icon-home',
    //   caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    //   status: false
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  // FormPickerRoutingModule
  ],
  exports: [RouterModule]
})
export class RawmaterialRoutingModule { }
