import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsportsHomeComponent } from './pages/esports/esports-home/esports-home.component';
import { EsportsShopComponent } from './pages/esports/esports-shop/esports-shop.component';
import { SignUpComponent } from './pages/esports/sign-up/sign-up.component';
import { ProductComponent } from './pages/esports/product/product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddEsportsProductComponent } from './pages/admin/add-esports-product/add-esports-product.component';
import { EsportsProductsComponent } from './pages/admin/esports-products/esports-products.component';
import { EditEsportsProductComponent } from './pages/admin/edit-esports-product/edit-esports-product.component';
import { EsportsHomeRotatingPicturesComponent } from './pages/admin/esports-home-rotating-pictures/esports-home-rotating-pictures.component';
import { UnderConstructionComponent } from './pages/common/under-construction/under-construction.component';
import { CheckoutComponent } from './pages/esports/checkout/checkout.component';
import { ProductResolver } from './_resolvers/product.resolver';
import { OrdersComponent } from './pages/esports/orders/orders.component';
import { OrderComponent } from './pages/esports/order/order.component';
import { OrderResolver } from './_resolvers/order.resolver';
import { AdminPartnersComponent } from './pages/admin/partners/partners.component';
import { AddPartnerComponent } from './pages/admin/add-partner/add-partner.component';
import { EditPartnerComponent } from './pages/admin/edit-partner/edit-partner.component';
import { PartnerResolver } from './_resolvers/partner.resolver';
import { PartnersComponent } from './pages/esports/partners/partners.component';
import { VerifyComponent } from './pages/esports/verify/verify.component';
import { MaintenanceComponent } from './pages/common/maintenance/maintenance.component';
import { MaintenanceGuard } from './_guard/maintenance.guard';
import { AuthGuard } from './_guard/auth.guard';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { MaintenanceResolver } from './_resolvers/maintenance.resolver';
import { ForgotPasswordComponent } from './pages/esports/forgot-password/forgot-password.component';
import { VerifyResendComponent } from './pages/esports/verify-resend/verify-resend.component';
import { ResetPasswordComponent } from './pages/esports/reset-password/reset-password.component';
import { NotLoggedInGuard } from './_guard/not-logged-in.guard';

const routes: Routes = [
    { path: '', redirectTo: 'esports', pathMatch: 'full' },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        data: { title: 'LevelUp | Admin Dashboard' },
        canActivate: [AuthGuard, MaintenanceGuard],
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                outlet: 'adminOutlet',
                resolve: { isMaintenance: MaintenanceResolver },
                data: { title: 'LevelUp | Admin Dashboard | Settings' }
            },
            {
                path: 'esports/products',
                component: EsportsProductsComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Esports Products' }
            },
            {
                path: 'esports/add-product',
                component: AddEsportsProductComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Add Product' }
            },
            {
                path: 'esports/edit-product/:id',
                component: EditEsportsProductComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Edit Product' }
            },
            {
                path: 'esports/home-rotating-pictures',
                component: EsportsHomeRotatingPicturesComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Home Rotating Pictures' }
            },
            {
                path: 'partners',
                component: AdminPartnersComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Partners' }
            },
            {
                path: 'partners/add-partner',
                component: AddPartnerComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Add Partner' }
            },
            {
                path: 'partners/edit-partner/:id',
                component: EditPartnerComponent,
                outlet: 'adminOutlet',
                resolve: { partner: PartnerResolver },
                data: { title: 'LevelUp | Admin Dashboard | Edit Partner' }
            }
        ]
    },
    {
        path: 'auth/signup',
        component: SignUpComponent,
        canActivate: [MaintenanceGuard, NotLoggedInGuard],
        data: { title: 'LevelUp | Sign Up' }
    },
    {
        path: 'auth/reset-password',
        component: ForgotPasswordComponent,
        canActivate: [MaintenanceGuard, NotLoggedInGuard],
        data: { title: 'LevelUp | Forgot Password' }
    },
    {
        path: 'auth/resend-verification',
        component: VerifyResendComponent,
        canActivate: [MaintenanceGuard, NotLoggedInGuard],
        data: { title: 'LevelUp | Resend Verification' }
    },
    {
        path: 'auth/reset-password/:token',
        component: ResetPasswordComponent,
        canActivate: [MaintenanceGuard, NotLoggedInGuard],
        data: { title: 'LevelUp | Reset Password' }
    },
    {
        path: 'auth/verify/:token',
        component: VerifyComponent,
        canActivate: [MaintenanceGuard, NotLoggedInGuard],
        data: { title: 'LevelUp | Verify' }
    },
    {
        path: 'esports',
        component: EsportsHomeComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Home' }
    },
    {
        path: 'esports/shop',
        component: EsportsShopComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Shop' }
    },
    {
        path: 'esports/shop/checkout',
        component: CheckoutComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Checkout' }
    },
    {
        path: 'esports/shop/orders',
        component: OrdersComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Orders' }
    },
    {
        path: 'esports/shop/orders/:id',
        component: OrderComponent,
        canActivate: [MaintenanceGuard],
        resolve: { order: OrderResolver },
        data: { title: 'LevelUp | Order' }
    },
    {
        path: 'esports/shop/product/:id',
        component: ProductComponent,
        canActivate: [MaintenanceGuard],
        resolve: { product: ProductResolver },
        data: { title: 'LevelUp | Product' }
    },
    {
        path: 'partners',
        component: PartnersComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Partners' }
    },
    {
        path: 'gaming-area',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Gaming Area' }
    },
    {
        path: 'bootcamp',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Bootcamp' }
    },
    {
        path: 'content-creators',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Content Creators' }
    },
    {
        path: 'teams/dota-2',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | Dota 2' }
    },
    {
        path: 'teams/csgo',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | CSGO' }
    },
    {
        path: 'teams/league-of-legends',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | League of Legends' }
    },
    {
        path: 'teams/warcraft-3',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | Warcraft III' }
    },
    {
        path: 'teams/fortnite',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | Fortnite' }
    },
    {
        path: 'teams/heroes-of-the-storm',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | Heroes of the Storm' }
    },
    {
        path: 'teams/hearthstone',
        component: UnderConstructionComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Teams | Hearthstone' }
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: { title: 'LevelUp | Maintenance' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule],
    providers: [ProductResolver]
})
export class AppRoutingModule {}
