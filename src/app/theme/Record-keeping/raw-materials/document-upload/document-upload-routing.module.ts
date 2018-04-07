import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentUploadComponent} from './document-upload.component';


const routes: Routes = [
 {
    path: '',
    component: DocumentUploadComponent,
    data: {
      title: 'Document Upload',
      icon: 'icon-receipt',
      status: true
    }
  },
  {
    path: '',
    component: DocumentUploadComponent,
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DocumentUploadRoutingModule {}

