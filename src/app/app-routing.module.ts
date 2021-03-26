import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsportsHomeComponent } from './pages/esports/esports-home/esports-home.component';
import { EsportsShopComponent } from './pages/esports/esports-shop/esports-shop.component';
import { SignInComponent } from './pages/esports/sign-in/sign-in.component';
import { SignUpComponent } from './pages/esports/sign-up/sign-up.component';


const routes: Routes = [
  { path: 'auth/signup', component: SignUpComponent},
  { path: 'auth/signin', component: SignInComponent},
  { path: 'esports', component: EsportsHomeComponent },
  { path: 'esports/shop', component: EsportsShopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
