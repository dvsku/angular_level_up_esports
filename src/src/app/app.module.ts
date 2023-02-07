import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';
import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { JwtInterceptorService } from './_interceptors/jwt-interceptor.service';
import { HeaderComponent } from './parts/common/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './parts/common/footer/footer.component';
import { ShopItemComponent } from './parts/common/shop-item/shop-item.component';
import { ShopItemDeckComponent } from './parts/common/shop-item-deck/shop-item-deck.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { ImageInputComponent } from './parts/common/image-input/image-input.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SwappableImageComponent } from './parts/common/swappable-image/swappable-image.component';
import { ProductService } from './services/product.service';
import { HomePictureService } from './services/home-picture.service';
import { UnderConstructionComponent } from './pages/common/under-construction/under-construction.component';
import { CartProductGroupComponent } from './parts/common/cart-product-group/cart-product-group.component';
import { CartProductComponent } from './parts/common/cart-product/cart-product.component';
import { ThreeRowGridLayoutComponent } from './parts/layout/three-row-grid-layout/three-row-grid-layout.component';
import { CartService } from './services/cart.service';
import { ImageGroupComponent } from './parts/common/image-group/image-group.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { MaintenanceComponent } from './pages/common/maintenance/maintenance.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { ChangeInformationComponent } from './pages/dashboard/change-information/change-information.component';
import { GeneralComponent } from './pages/dashboard/general/general.component';
import { PageLoaderComponent } from './parts/loaders/page-loader/page-loader.component';
import { CustomToastComponent } from './_toastr/custom-toast/custom-toast.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { VerifyComponent } from './pages/auth/verify/verify.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { VerifyResendComponent } from './pages/auth/verify-resend/verify-resend.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { EditPartnerComponent } from './pages/admin/partners/partner/edit-partner.component';
import { PeopleComponent } from './pages/admin/people/people/people.component';
import { EditPersonComponent } from './pages/admin/people/person/edit-person.component';
import { AdminContentCreatorsComponent } from './pages/admin/content-creators/content-creators/admin-content-creators.component';
import { EditContentCreatorComponent } from './pages/admin/content-creators/content-creator/edit-content-creator.component';
import { ContentCreatorsComponent } from './pages/content-creators/content-creators.component';
import { CardContentCreatorComponent } from './parts/common/card-content-creator/card-content-creator.component';
import { CardContentCreatorDeckComponent } from './parts/common/card-content-creator-deck/card-content-creator-deck.component';
import { ImageSelectComponent } from './parts/common/image-select/image-select.component';
import { EditAchievementComponent } from './pages/admin/teams/achievements/single/edit-achievement.component';
import { PersonPickerComponent } from './parts/common/person-picker/person-picker.component';
import { EditRosterMemberComponent } from './pages/admin/teams/roster-members/edit-roster-member.component';
import { ImagePreviewComponent } from './parts/common/image-preview/image-preview.component';
import { TeamMemberGroupComponent } from './parts/common/team-member-group/team-member-group.component';
import { TeamMemberCreatorComponent } from './parts/common/team-member-creator/team-member-creator.component';
import { NgbDateCustomParserFormatter } from './_formatters/date-formatter';
import { TeamComponent } from './pages/team/team.component';
import { CardTeamMemberDeckComponent } from './parts/common/card-team-member-deck/card-team-member-deck.component';
import { CardTeamMemberComponent } from './parts/common/card-team-member/card-team-member.component';
import { GenericModalComponent } from './parts/modals/generic-modal/generic-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { BarcraftComponent } from './pages/barcraft/barcraft.component';
import { CheckoutComponent } from './pages/shop/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/all/orders.component';
import { OrderComponent } from './pages/orders/single/order.component';
import { ProductComponent } from './pages/shop/product/product.component';
import { ShopComponent } from './pages/shop/shop/shop.component';
import { CouponsComponent } from './pages/admin/shop/coupons/all/coupons.component';
import { AddCouponComponent } from './pages/admin/shop/coupons/single/add-coupon.component';
import { EditShopProductComponent } from './pages/admin/shop/products/single/edit-shop-product.component';
import { AddShopProductComponent } from './pages/admin/shop/products/single/add-shop-product.component';
import { HomeCarouselComponent } from './pages/admin/home-carousel/home-carousel.component';
import { ShopProductsComponent } from './pages/admin/shop/products/all/shop-products.component';
import { AddContentCreatorComponent } from './pages/admin/content-creators/content-creator/add-content-creator.component';
import { AddPersonComponent } from './pages/admin/people/person/add-person.component';
import { AchievementsComponent } from './pages/admin/teams/achievements/all/achievements.component';
import { AddAchievementComponent } from './pages/admin/teams/achievements/single/add-achievement.component';
import { AddRosterMemberComponent } from './pages/admin/teams/roster-members/add-roster-member.component';
import { AddPartnerComponent } from './pages/admin/partners/partner/add-partner.component';
import { AdminPartnersComponent } from './pages/admin/partners/partners/partners.component';
import { AngularFittextModule } from 'angular-fittext';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ShopComponent,
        BarcraftComponent,
        FooterComponent,
        HeaderComponent,
        ShopItemComponent,
        ShopItemDeckComponent,
        SignUpComponent,
        ProductComponent,
        AdminDashboardComponent,
        AddShopProductComponent,
        ImageInputComponent,
        ShopProductsComponent,
        SwappableImageComponent,
        EditShopProductComponent,
        HomeCarouselComponent,
        UnderConstructionComponent,
        CheckoutComponent,
        CartProductGroupComponent,
        CartProductComponent,
        ThreeRowGridLayoutComponent,
        OrdersComponent,
        OrderComponent,
        AdminPartnersComponent,
        ImageGroupComponent,
        AddPartnerComponent,
        EditPartnerComponent,
        PartnersComponent,
        VerifyComponent,
        MaintenanceComponent,
        SettingsComponent,
        DashboardComponent,
        ForgotPasswordComponent,
        VerifyResendComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        ChangeInformationComponent,
        GeneralComponent,
        PageLoaderComponent,
        CustomToastComponent,
        PeopleComponent,
        AddPersonComponent,
        EditPersonComponent,
        AdminContentCreatorsComponent,
        AddContentCreatorComponent,
        EditContentCreatorComponent,
        ContentCreatorsComponent,
        CardContentCreatorComponent,
        CardContentCreatorDeckComponent,
        ImageSelectComponent,
        AchievementsComponent,
        AddAchievementComponent,
        EditAchievementComponent,
        PersonPickerComponent,
        AddRosterMemberComponent,
        EditRosterMemberComponent,
        ImagePreviewComponent,
        TeamMemberGroupComponent,
        TeamMemberCreatorComponent,
        TeamComponent,
        CardTeamMemberDeckComponent,
        CardTeamMemberComponent,
        CouponsComponent,
        AddCouponComponent,
        GenericModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            toastComponent: CustomToastComponent,
            timeOut: 3000,
            positionClass: 'toast-top-right',
            toastClass: '',
            iconClasses: {
                error: 'custom-toast-error',
                info: 'custom-toast-info',
                success: 'custom-toast-success',
                warning: ''
            }
        }),
        NgbModule,
        DragDropModule,
        FontAwesomeModule,
        ImageCropperModule,
        AngularFittextModule
    ],
    entryComponents: [CustomToastComponent],
    providers: [
        CookieService,
        CartService,
        ProductService,
        HomePictureService,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
        {
            provide: APP_BASE_HREF,
            useFactory: getBaseHref,
            deps: [PlatformLocation]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
