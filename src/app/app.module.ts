import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { DataService } from './service/data.service';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TreeviewModule } from 'ngx-treeview';

import { LoginComponent } from './theme/login/login.component';


import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './common/common.service';
import { HttpsRequestInterceptor } from './common/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './common/auth.service';
import { LoadingService } from './common/loading.service';

// import { RawMaterialComponent } from './theme/Record-keeping/raw-materials/raw-material/raw-material.component';
// import { RawMaterialDetailsComponent } from './theme/Record-keeping/raw-materials/raw-material-details/raw-material-details.component';
// import { RawMaterialTableComponent } from './theme/Record-keeping/raw-materials/raw-material-table/raw-material-table.component';

import { RawMaterialsService } from './service/raw-materials.service';
import { SupplierService } from './service/supplier.service';
import { PlantService } from './service/plant.service';
import { ProductService } from './service/product.service';
import { BrokerService } from './service/broker.service';
// import {FormPickerComponent} from './theme/form-picker/form-picker.component';
// import {FormPickerRoutingModule} from './theme/form-picker/form-picker-routing.module';
import { UploaddataService } from './service/uploaddata.service';
import { StyleComponent } from './style/style.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ForgotPasswordComponent } from './theme/login/forgot-password/forgot-password.component';
// import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { Component } from '@angular/core';

import { ResetPasswordComponent } from './theme/login/reset-password/reset-password.component';
// import {LocalStorageService, LocalStorage} from '@Deprecated ng2-webstorage';//ng2-webstorage';
//import {Control} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent,

    StyleComponent,
    ForgotPasswordComponent,
   
    ResetPasswordComponent

   

    // FormPickerComponent,
    // RawMaterialComponent,
    // RawMaterialDetailsComponent,
    // RawMaterialTableComponent
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
    DataService,
    CommonService,
    AuthService,
    RawMaterialsService,
    SupplierService,
    PlantService,
   // Control,
    //LocalStorage,   
    //LocalStorageService,
    ProductService,
    BrokerService,
    UploaddataService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
