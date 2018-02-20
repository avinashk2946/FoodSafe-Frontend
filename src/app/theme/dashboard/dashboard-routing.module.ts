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
      {
        path: 'corporate',
        loadChildren: './corporate/corporate.module#CorporateModule'
        // loadChildren: './basic-login/basic-login.module#BasicLoginModule'
        
      
      },
      {
        path: 'ecommerce',
        // loadChildren: './ecommerce/ecommerce.module#EcommerceModule'
      },
      {
        path: 'analytics',
        // loadChildren: './analytics/analytics.module#AnalyticsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
