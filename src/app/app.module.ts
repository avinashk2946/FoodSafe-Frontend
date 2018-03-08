import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule} from './shared/shared.module';
import { MenuItems} from './shared/menu-items/menu-items';
import { BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { DataService} from './service/data.service';
import { FormsModule,FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TreeviewModule } from 'ngx-treeview';

import {LoginComponent} from './theme/login/login.component';


import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './common/common.service';
import { HttpsRequestInterceptor } from './common/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './common/auth.service';
import { LoadingService } from './common/loading.service';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PoComponent } from './components/po/po.component';
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


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent,
    SidebarComponent,
    PoComponent,
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
    HttpModule,
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
   { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
   LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
