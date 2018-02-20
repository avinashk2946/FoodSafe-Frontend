import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'dashboard',
      status: false
    },
    children: [
      // {
      //   path: 'corporate',
      //   loadChildren: './corporate'
      // },
      {

        path: 'corporate',
        loadChildren: './corporate/corporate.module#CorporateModule'
        // loadChildren: './basic-login/basic-login.module#BasicLoginModule'
        
      
      },
      {
        path: 'plantdashboard',
        // loadChildren: './plantdashboard/plantdashboard.module#EcommerceModule'
      },
      {
        path: 'mydashboard',
        // loadChildren: './mydashboard/mydashboard.module#AnalyticsModule'
      },
       {
        path: 'summary',
        // loadChildren: './summary/summary.module#AnalyticsModule'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
