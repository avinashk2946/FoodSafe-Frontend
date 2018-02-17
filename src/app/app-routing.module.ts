import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {LoginComponent} from './theme/login/login.component';
import {PoComponent} from './components/po/po.component';

const routes: Routes = [
  {  path : '',redirectTo : 'login', pathMatch : 'full'},

  { path: 'admin',component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard/default',pathMatch: 'full' },
      { path: 'dashboard',loadChildren: './theme/dashboard/dashboard.module#DashboardModule' },
    ]
  },

  {path: 'login',component : LoginComponent,},

  { path:'po',component:PoComponent,},

  {path : '**', redirectTo : 'login',pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
