import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentUploadComponent} from './document-upload.component';


const routes: Routes = [
 {
    path: '',
    component: DocumentUploadComponent,
    data: {
      title: 'Purchase Order',
      icon: 'icon-receipt',
      status: true
    }
  },
  {
    path: '',
    component: DocumentUploadComponent,
  },
  {
    path: 'recordlist',
    loadChildren: '../record-list/record-list.module#RecordListModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DocumentUploadRoutingModule {}

