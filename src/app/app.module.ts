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
import { HeaderComponent } from './parts/common/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './parts/common/footer/footer.component';
import { ShopItemComponent } from './parts/common/shop-item/shop-item.component';
import { ShopItemDeckComponent } from './parts/common/shop-item-deck/shop-item-deck.component';
import { SignUpComponent } from './pages/esports/sign-up/sign-up.component';
import { ProductComponent } from './pages/esports/product/product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddEsportsProductComponent } from './pages/admin/add-esports-product/add-esports-product.component';
import { ImagesFormGroupComponent } from './parts/common/images-form-group/images-form-group.component';
import { ImageInputComponent } from './parts/common/image-input/image-input.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EsportsProductsComponent } from './pages/admin/esports-products/esports-products.component';
import { SwappableImageComponent } from './parts/common/swappable-image/swappable-image.component';
import { ProductService } from './services/product.service';
import { EditEsportsProductComponent } from './pages/admin/edit-esports-product/edit-esports-product.component';
import { EsportsHomeRotatingPicturesComponent } from './pages/admin/esports-home-rotating-pictures/esports-home-rotating-pictures.component';
import { RotatingPictureFormGroupComponent } from './parts/common/rotating-picture-form-group/rotating-picture-form-group.component';
import { HomePictureService } from './services/home-picture.service';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { UnderConstructionComponent } from './pages/common/under-construction/under-construction.component';
import { CheckoutComponent } from './pages/esports/checkout/checkout.component';
import { CartProductGroupComponent } from './parts/common/cart-product-group/cart-product-group.component';
import { CartProductComponent } from './parts/common/cart-product/cart-product.component';
import { ThreeRowGridLayoutComponent } from './parts/layout/three-row-grid-layout/three-row-grid-layout.component';
import { CartService } from './services/cart.service';

@NgModule({
    declarations: [
        AppComponent,
        EsportsHomeComponent,
        EsportsShopComponent,
        BarcraftHomeComponent,
        FooterComponent,
        HeaderComponent,
        ShopItemComponent,
        ShopItemDeckComponent,
        SignUpComponent,
        ProductComponent,
        AdminDashboardComponent,
        AddEsportsProductComponent,
        ImagesFormGroupComponent,
        ImageInputComponent,
        EsportsProductsComponent,
        SwappableImageComponent,
        EditEsportsProductComponent,
        EsportsHomeRotatingPicturesComponent,
        RotatingPictureFormGroupComponent,
        UnderConstructionComponent,
        CheckoutComponent,
        CartProductGroupComponent,
        CartProductComponent,
        ThreeRowGridLayoutComponent
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
        ImageCropperModule,
        NgxBootstrapSliderModule
    ],
    providers: [
        CookieService,
        CartService,
        ProductService,
        HomePictureService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
