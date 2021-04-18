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

const routes: Routes = [
    { path: '', redirectTo: 'esports', pathMatch: 'full' },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        data: { title: 'LevelUp | Admin Dashboard' },
        children: [
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
            }
        ]
    },
    { path: 'auth/signup', component: SignUpComponent, data: { title: 'LevelUp | Sign Up' } },
    { path: 'esports', component: EsportsHomeComponent, data: { title: 'LevelUp | Home' } },
    { path: 'esports/shop', component: EsportsShopComponent, data: { title: 'LevelUp | Shop' } },
    { path: 'esports/shop/checkout', component: CheckoutComponent, data: { title: 'LevelUp | Checkout' } },
    { path: 'esports/shop/orders', component: OrdersComponent, data: { title: 'LevelUp | Orders' } },
    {
        path: 'esports/shop/orders/:id',
        component: OrderComponent,
        resolve: { order: OrderResolver },
        data: { title: 'LevelUp | Order' }
    },
    {
        path: 'esports/shop/product/:id',
        component: ProductComponent,
        resolve: { product: ProductResolver },
        data: { title: 'LevelUp | Product' }
    },
    { path: 'partners', component: UnderConstructionComponent, data: { title: 'LevelUp | Partners' } },
    { path: 'gaming-area', component: UnderConstructionComponent, data: { title: 'LevelUp | Gaming Area' } },
    { path: 'bootcamp', component: UnderConstructionComponent, data: { title: 'LevelUp | Bootcamp' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule],
    providers: [ProductResolver]
})
export class AppRoutingModule {}
