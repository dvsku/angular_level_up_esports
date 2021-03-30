import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsportsHomeComponent } from './pages/esports/esports-home/esports-home.component';
import { EsportsShopComponent } from './pages/esports/esports-shop/esports-shop.component';
import { SignInComponent } from './pages/esports/sign-in/sign-in.component';
import { SignUpComponent } from './pages/esports/sign-up/sign-up.component';
import { ProductComponent } from './pages/esports/product/product.component'
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddEsportsProductComponent } from './pages/admin/add-esports-product/add-esports-product.component';
import { EsportsProductsComponent } from './pages/admin/esports-products/esports-products.component';


const routes: Routes = [
  { path: 'admin/dashboard', component: AdminDashboardComponent,
    children: [
      { path: 'esports/products', component: EsportsProductsComponent, outlet: "adminOutlet"},
      { path: 'esports/add-product', component: AddEsportsProductComponent, outlet: "adminOutlet"},
    ]
  },
  { path: 'auth/signup', component: SignUpComponent},
  { path: 'auth/signin', component: SignInComponent},
  { path: 'esports', component: EsportsHomeComponent },
  { path: 'esports/shop', component: EsportsShopComponent},
  { path: 'esports/shop/product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
