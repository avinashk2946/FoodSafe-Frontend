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
import { StyleComponent } from './style/style.component';

import { DataService } from './service/data.service';
import { CommonService } from './common/common.service';
import { AuthService } from './common/auth.service';
import { LoadingService } from './common/loading.service';
import { RawMaterialsService } from './service/raw-materials.service';
import { SupplierService } from './service/supplier.service';
import { PlantService } from './service/plant.service';
import { ProductService } from './service/product.service';
import { BrokerService } from './service/broker.service';
import { UploaddataService } from './service/uploaddata.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsRequestInterceptor } from './common/http.interceptor';
import { MenuItems } from './shared/menu-items/menu-items';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent,
    StyleComponent,
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
    ProductService,
    BrokerService,
    UploaddataService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
