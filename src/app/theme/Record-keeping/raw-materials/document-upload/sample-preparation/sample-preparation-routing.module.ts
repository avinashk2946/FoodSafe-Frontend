import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SamplePreparationComponent} from './sample-preparation.component';


const routes: Routes = [
 {
    path: '',
    component: SamplePreparationComponent,
    data: {
      title: 'Sample Perparation',
      icon: 'icon-receipt',
      status: true
    }
  },
  {
    path: '',
    component: SamplePreparationComponent,
  },
 // {
 //    path: 'document-upload/:id',
 //    loadChildren: './sample-preparation/sample-preparation.module#SamplePreparationModule'
 //  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SamplePreparationRoutingModule {}

