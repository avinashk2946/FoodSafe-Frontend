import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    data: {
      title: 'Login Page',
      icon: 'icon-shortcode',
      status: true
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
