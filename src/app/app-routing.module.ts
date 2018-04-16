import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { LoginComponent } from './theme/login/login.component';
import { ForgotPasswordComponent } from './theme/login/forgot-password/forgot-password.component';
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
      {
        path: 'recordkeeping',
        loadChildren: './theme/Record-keeping/recordkeeping.module#RecordKeepingModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent },

  { path: 'forgotPassword', component: ForgotPasswordComponent },

  // { path: 'resetPassword', component: ResetPasswordComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
