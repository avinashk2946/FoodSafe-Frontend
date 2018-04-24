import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QMR14Component } from './qmr-14.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: QMR14Component,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
 export class QMR14RoutingModule { }

