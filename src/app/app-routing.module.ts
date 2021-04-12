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

const routes: Routes = [
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        children: [
            {
                path: 'esports/products',
                component: EsportsProductsComponent,
                outlet: 'adminOutlet'
            },
            {
                path: 'esports/add-product',
                component: AddEsportsProductComponent,
                outlet: 'adminOutlet'
            },
            {
                path: 'esports/edit-product/:id',
                component: EditEsportsProductComponent,
                outlet: 'adminOutlet'
            },
            {
                path: 'esports/home-rotating-pictures',
                component: EsportsHomeRotatingPicturesComponent,
                outlet: 'adminOutlet'
            }
        ]
    },
    { path: 'auth/signup', component: SignUpComponent },
    { path: 'esports', component: EsportsHomeComponent },
    { path: 'esports/shop', component: EsportsShopComponent },
    { path: 'esports/shop/checkout', component: CheckoutComponent },
    { path: 'esports/shop/product/:id', component: ProductComponent },
    { path: 'partners', component: UnderConstructionComponent },
    { path: 'gaming-area', component: UnderConstructionComponent },
    { path: 'bootcamp', component: UnderConstructionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
