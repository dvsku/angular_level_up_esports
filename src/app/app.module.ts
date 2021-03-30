import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';
import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { JwtInterceptorService } from './_interceptors/jwt-interceptor.service';
import { EsportsHomeComponent } from './pages/esports/esports-home/esports-home.component';
import { EsportsShopComponent } from './pages/esports/esports-shop/esports-shop.component';
import { BarcraftHomeComponent } from './pages/barcraft/barcraft-home/barcraft-home.component';
import { BarcraftShopComponent } from './pages/barcraft/barcraft-shop/barcraft-shop.component';
import { EsportsHeaderComponent } from './parts/esports/esports-header/esports-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EsportsFooterComponent } from './parts/esports/esports-footer/esports-footer.component';
import { ShopItemComponent } from './parts/common/shop-item/shop-item.component';
import { ShopItemDeckComponent } from './parts/common/shop-item-deck/shop-item-deck.component';
import { SignUpComponent } from './pages/esports/sign-up/sign-up.component';
import { SignInComponent } from './pages/esports/sign-in/sign-in.component';
import { ProductComponent } from './pages/esports/product/product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddEsportsProductComponent } from './pages/admin/add-esports-product/add-esports-product.component';
import { ImagesFormGroupComponent } from './parts/common/images-form-group/images-form-group.component';
import { ImageInputComponent } from './parts/common/image-input/image-input.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EsportsProductsComponent } from './pages/admin/esports-products/esports-products.component';

@NgModule({
  declarations: [
    AppComponent,
    EsportsHomeComponent,
    EsportsShopComponent,
    BarcraftHomeComponent,
    BarcraftShopComponent,
    EsportsHeaderComponent,
    EsportsFooterComponent,
    ShopItemComponent,
    ShopItemDeckComponent,
    SignUpComponent,
    SignInComponent,
    ProductComponent,
    AdminDashboardComponent,
    AddEsportsProductComponent,
    ImagesFormGroupComponent,
    ImageInputComponent,
    EsportsProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    DragDropModule,
    FontAwesomeModule,
    ImageCropperModule
  ],
  providers: [CookieService ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
