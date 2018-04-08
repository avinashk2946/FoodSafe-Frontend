import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'angular2-cookie/services/cookies.service';
 
 
const routes: Routes = [
  {
    path: '**',
    component:LoginComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //imports: [ BrowserModule ],
  exports: [RouterModule],
 // declarations: [ login.component ],
  providers: [ CookieService ],
 // bootstrap: [ login.component ]
})
export class LoginRoutingModule { }

