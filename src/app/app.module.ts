import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import {DataService} from './service/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {LoginComponent} from './theme/login/login.component';


import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './common/common.service';
import { HttpsRequestInterceptor } from './common/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './common/auth.service';
import { LoadingService } from './common/loading.service';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot()
  ],
  providers: [
  MenuItems,
  DataService,
  CommonService,
   AuthService,
   { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
   LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
