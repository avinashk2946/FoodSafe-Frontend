import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SampleCollectionComponent} from './sample-collection.component';


const routes: Routes = [
 {
    path: '',
    component: SampleCollectionComponent,
    data: {
      title: 'Sample Collection',
      icon: 'icon-receipt',
      status: true
    }
  },
  {
    path: '',
    component: SampleCollectionComponent,
  },
      //   {
      //   path: 'document-upload/:id',
      //   loadChildren: './sample-collection/sample-collection.module#SamplePreparationModule'
      // }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SampleCollectionRoutingModule {}

