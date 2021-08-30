import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { UnderConstructionComponent } from './pages/common/under-construction/under-construction.component';
import { ProductResolver } from './_resolvers/product.resolver';
import { OrderResolver } from './_resolvers/order.resolver';
import { PartnerResolver } from './_resolvers/partner.resolver';
import { PartnersComponent } from './pages/partners/partners.component';
import { MaintenanceComponent } from './pages/common/maintenance/maintenance.component';
import { MaintenanceGuard } from './_guard/maintenance.guard';
import { AuthGuard } from './_guard/auth.guard';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { MaintenanceResolver } from './_resolvers/maintenance.resolver';
import { NotLoggedInGuard } from './_guard/not-logged-in.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { GeneralComponent } from './pages/dashboard/general/general.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { ChangeInformationComponent } from './pages/dashboard/change-information/change-information.component';
import { UserResolver } from './_resolvers/user.resolver';
import { LoggedInGuard } from './_guard/logged-in.guard';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { VerifyResendComponent } from './pages/auth/verify-resend/verify-resend.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { VerifyComponent } from './pages/auth/verify/verify.component';
import { EditPartnerComponent } from './pages/admin/partners/partner/edit-partner.component';
import { PeopleComponent } from './pages/admin/people/people/people.component';
import { EditPersonComponent } from './pages/admin/people/person/edit-person.component';
import { PersonResolver } from './_resolvers/person.resolver';
import { AdminContentCreatorsComponent } from './pages/admin/content-creators/content-creators/admin-content-creators.component';
import { EditContentCreatorComponent } from './pages/admin/content-creators/content-creator/edit-content-creator.component';
import { ContentCreatorResolver } from './_resolvers/content-creator.resolver';
import { ContentCreatorsComponent } from './pages/content-creators/content-creators.component';
import { TeamResolver } from './_resolvers/team.resolver';
import { EditRosterMemberComponent } from './pages/admin/teams/roster-members/edit-roster-member.component';
import { TeamMemberResolver } from './_resolvers/team-member.resolver';
import { HasChangesGuard } from './_guard/has-changes.guard';
import { EditAchievementComponent } from './pages/admin/teams/achievements/single/edit-achievement.component';
import { AchievementResolver } from './_resolvers/achievement.resolver';
import { TeamComponent } from './pages/team/team.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/all/orders.component';
import { OrderComponent } from './pages/orders/single/order.component';
import { CheckoutComponent } from './pages/shop/checkout/checkout.component';
import { ProductComponent } from './pages/shop/product/product.component';
import { ShopComponent } from './pages/shop/shop/shop.component';
import { ShopProductsComponent } from './pages/admin/shop/products/all/shop-products.component';
import { AddShopProductComponent } from './pages/admin/shop/products/single/add-shop-product.component';
import { EditShopProductComponent } from './pages/admin/shop/products/single/edit-shop-product.component';
import { HomeCarouselComponent } from './pages/admin/home-carousel/home-carousel.component';
import { CouponsComponent } from './pages/admin/shop/coupons/all/coupons.component';
import { AddCouponComponent } from './pages/admin/shop/coupons/single/add-coupon.component';
import { AddContentCreatorComponent } from './pages/admin/content-creators/content-creator/add-content-creator.component';
import { AddPersonComponent } from './pages/admin/people/person/add-person.component';
import { AchievementsComponent } from './pages/admin/teams/achievements/all/achievements.component';
import { AddAchievementComponent } from './pages/admin/teams/achievements/single/add-achievement.component';
import { AddRosterMemberComponent } from './pages/admin/teams/roster-members/add-roster-member.component';
import { AdminPartnersComponent } from './pages/admin/partners/partners/partners.component';
import { AddPartnerComponent } from './pages/admin/partners/partner/add-partner.component';

const routes: Routes = [
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
                path: 'shop/products',
                component: ShopProductsComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Esports Products' }
            },
            {
                path: 'shop/add-product',
                component: AddShopProductComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Add Product' }
            },
            {
                path: 'shop/edit-product/:id',
                component: EditShopProductComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Edit Product' }
            },
            {
                path: 'home-carousel',
                component: HomeCarouselComponent,
                canDeactivate: [HasChangesGuard],
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Home Rotating Pictures' }
            },
            {
                path: 'partners',
                component: AdminPartnersComponent,
                canDeactivate: [HasChangesGuard],
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
            },
            {
                path: 'people',
                component: PeopleComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | People' }
            },
            {
                path: 'people/add-person',
                component: AddPersonComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Add Person' }
            },
            {
                path: 'people/edit-person/:id',
                component: EditPersonComponent,
                outlet: 'adminOutlet',
                resolve: { person: PersonResolver },
                data: { title: 'LevelUp | Admin Dashboard | Edit Person' }
            },
            {
                path: 'content-creators',
                component: AdminContentCreatorsComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Content Creators' }
            },
            {
                path: 'content-creators/add-content-creator',
                component: AddContentCreatorComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Content Creators | Add Content Creator' }
            },
            {
                path: 'content-creators/edit-content-creator/:id',
                component: EditContentCreatorComponent,
                outlet: 'adminOutlet',
                resolve: { contentCreator: ContentCreatorResolver },
                data: { title: 'LevelUp | Admin Dashboard | Content Creators | Edit Content Creator' }
            },
            {
                path: 'teams/:name',
                component: AchievementsComponent,
                outlet: 'adminOutlet',
                resolve: { team: TeamResolver },
                canDeactivate: [HasChangesGuard],
                data: { title: 'LevelUp | Admin Dashboard | Team' }
            },
            {
                path: 'teams/:name/add-roster-member',
                component: AddRosterMemberComponent,
                outlet: 'adminOutlet',
                resolve: { team: TeamResolver },
                data: { title: 'LevelUp | Admin Dashboard | Team' }
            },
            {
                path: 'teams/:name/edit-roster-member/:id',
                component: EditRosterMemberComponent,
                outlet: 'adminOutlet',
                resolve: { team: TeamResolver, member: TeamMemberResolver },
                data: { title: 'LevelUp | Admin Dashboard | Team' }
            },
            {
                path: 'teams/:name/add-achievement',
                component: AddAchievementComponent,
                outlet: 'adminOutlet',
                resolve: { team: TeamResolver },
                data: { title: 'LevelUp | Admin Dashboard | Team' }
            },
            {
                path: 'teams/:name/edit-achievement/:id',
                component: EditAchievementComponent,
                outlet: 'adminOutlet',
                resolve: { team: TeamResolver, achievement: AchievementResolver },
                data: { title: 'LevelUp | Admin Dashboard | Team' }
            },
            {
                path: 'coupons',
                component: CouponsComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Coupons' }
            },
            {
                path: 'coupons/add-coupon',
                component: AddCouponComponent,
                outlet: 'adminOutlet',
                data: { title: 'LevelUp | Admin Dashboard | Coupons | Add Coupon' }
            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'LevelUp | Dashboard' },
        canActivate: [MaintenanceGuard, LoggedInGuard],
        children: [
            {
                path: 'general',
                component: GeneralComponent,
                outlet: 'userOutlet',
                resolve: { isMaintenance: MaintenanceResolver },
                data: { title: 'LevelUp | Dashboard | General' }
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                outlet: 'userOutlet',
                data: { title: 'LevelUp | Dashboard | Change Password' }
            },
            {
                path: 'update-information',
                component: ChangeInformationComponent,
                resolve: { user: UserResolver },
                outlet: 'userOutlet',
                data: { title: 'LevelUp | Dashboard | Update Information' }
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
        path: '',
        component: HomeComponent,
        canActivate: [MaintenanceGuard],
        pathMatch: 'full',
        data: { title: 'LevelUp | Home' }
    },
    {
        path: 'shop',
        component: ShopComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Shop' }
    },
    {
        path: 'shop/checkout',
        component: CheckoutComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Checkout' }
    },
    {
        path: 'shop/orders',
        component: OrdersComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Orders' }
    },
    {
        path: 'shop/orders/:id',
        component: OrderComponent,
        canActivate: [MaintenanceGuard],
        resolve: { order: OrderResolver },
        data: { title: 'LevelUp | Order' }
    },
    {
        path: 'shop/product/:id',
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
        component: ContentCreatorsComponent,
        canActivate: [MaintenanceGuard],
        data: { title: 'LevelUp | Content Creators' }
    },
    {
        path: 'teams/:name',
        component: TeamComponent,
        canActivate: [MaintenanceGuard],
        resolve: { team: TeamResolver },
        data: { title: 'LevelUp | Team' }
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: { title: 'LevelUp | Maintenance' }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            scrollPositionRestoration: 'enabled',
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule],
    providers: [ProductResolver]
})
export class AppRoutingModule {}
