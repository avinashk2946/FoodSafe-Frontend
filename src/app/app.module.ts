import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TreeviewModule } from 'ngx-treeview';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';


import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './theme/login/login.component';


import { CommonService } from './common/common.service';
import { AuthService } from './common/auth.service';
import { LoadingService } from './common/loading.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsRequestInterceptor } from './common/http.interceptor';
import { MenuItems } from './shared/menu-items/menu-items';

import { ForgotPasswordComponent } from './theme/login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './theme/login/reset-password/reset-password.component';

//import {Control} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
 ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AsyncLocalStorageModule,
    HttpModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    TreeviewModule.forRoot()
    // FormPickerRoutingModule
  ],
  providers: [
    MenuItems,
    CommonService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
