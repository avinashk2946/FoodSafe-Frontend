import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { LoginComponent } from './theme/login/login.component';
// import { ForgotPasswordComponent } from './theme/forgot-password/forgot-password.component';
// /import { ResetPasswordComponent } from './theme/login/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '', component: AdminComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },

      // { path: '',   
      //   redirectTo: 'dashboard/corporate',pathMatch: 'full' 
      // },

      // { path: 'dashboard/corporate',
      //   loadChildren: './theme/dashboard/corporate-dashboard/corporate.module#CorporateModule' 
      // },
      // { path: 'dashboard/plant',
      //   loadChildren: './theme/dashboard/plant-dashboard/plant.module#PlantModule' 
      // },
      // { path: 'dashboard/my',
      //   loadChildren: './theme/dashboard/my-dashboard/my.module#MyModule' 
      // },
      // { path: 'dashboard/summary',
      //   loadChildren: './theme/dashboard/summary/summary.module#SummaryModule' 
      // },
      {
        path: 'recordkeeping',
        loadChildren: './theme/Record-keeping/recordkeeping.module#RecordKeepingModule'
      },
      {
        path: 'configuration',
        loadChildren: './theme/configuration/configuration.module#ConfigurationModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent },

 // { path: 'forgotPassword', component: ForgotPasswordComponent },

  // { path: 'resetPassword', component: ResetPasswordComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }