import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Raw Materials',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: './record-list/record-list.module#RecordListModule'
      },
      {
        path: 'create',
        loadChildren: './create-record/create-record.module#CreateRecordModule'
      },
      {
        path: 'document-upload/:id',
        loadChildren: './document-upload/document-upload.module#DocumentUploadModule'
      },
      //  {
      //   path: 'document-upload/:id',
      //   loadChildren: './sample-preparation/sample-preparation.module#SamplePreparationModule'
      // },
      //   {
      //   path: 'document-upload/:id',
      //   loadChildren: './sample-collection/sample-collection.module#SamplePreparationModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialsRoutingModule { }
