import { Component, OnInit } from '@angular/core';
import { faBars, faAngleDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { CartNotifyService } from 'src/app/services/cart-notify.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-esports-header',
    templateUrl: './esports-header.component.html',
    styleUrls: ['./esports-header.component.sass']
})
export class EsportsHeaderComponent implements OnInit {
    public isMenuCollapsed = true;
    public isShopCollapsed = true;
    public isTeamsCollapsed = true;
    public isCartCollapsed = true;
    faBars = faBars;
    faArrowDown = faAngleDown;
    faCart = faShoppingCart;

    currentUserSubscription: Subscription;
    currentUser: JwtResponse;

    cart: ProductInOrder[];
    categories: ProductCategory[];
    featuredProducts: ProductInfo[];

    private productsSubscription: Subscription;

    model: any = {
        username: '',
        password: '',
        remembered: false
    };
    isInvalid = false;

    constructor(
        private userService: UserService,
        private cartService: CartService,
        private productCategoryService: ProductCategoryService,
        private productService: ProductService,
        private cartNotifyService: CartNotifyService
    ) {}

    ngOnInit(): void {
        this.currentUserSubscription = this.userService.currentUser.subscribe((user) => {
            this.currentUser = user;
        });
        this.productCategoryService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
        this.productsSubscription = this.productService
            .getProducts()
            .subscribe((prods) => {
                if (prods !== undefined && prods !== null) {
                    this.featuredProducts = prods
                        .sort((a, b) => a.sold - b.sold)
                        .slice(0, 3);
                    //console.log(this.featuredProducts)
                }
            });

        this.getCart();
        this.cartNotifyService.obs.subscribe(() => this.getCart());
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        this.productsSubscription.unsubscribe();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // CART
    //////////////////////////////////////////////////////////////////////////////////////////////////

    getCart(): void {
        this.cart = this.cartService.getCart();
    }

    removeFromCart(product: ProductInOrder): void {
        this.cartService.removeProductFromCart(product);
    }

    increaseCount(product: ProductInOrder): void {
        product.count++;
    }

    decreaseCount(product: ProductInOrder): void {
        if (product.count > 0) {
            product.count--;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // AUTH
    //////////////////////////////////////////////////////////////////////////////////////////////////

    logout(): void {
        this.userService.logout();
    }

    onSubmit(): void {
        this.isInvalid = false;
        this.userService.login(this.model).subscribe((jwtResponse) => {
            if (jwtResponse) {
                this.model.username = '';
                this.model.password = '';
                this.model.remembered = false;
                this.currentUser = jwtResponse;
                //this.router.navigateByUrl('/esports');
            } else {
                this.isInvalid = true;
            }
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // DROPDOWN/COLLAPSE CONTROLS
    //////////////////////////////////////////////////////////////////////////////////////////////////

    toggleMenu(): void {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this.isShopCollapsed = true;
        this.isTeamsCollapsed = true;
        this.isCartCollapsed = true;
    }

    toggleShop(): void {
        this.isShopCollapsed = !this.isShopCollapsed;
        this.isTeamsCollapsed = true;
        this.isCartCollapsed = true;
    }

    toggleTeams(): void {
        this.isShopCollapsed = true;
        this.isTeamsCollapsed = !this.isTeamsCollapsed;
        this.isCartCollapsed = true;
    }

    toggleCart(): void {
        this.isCartCollapsed = !this.isCartCollapsed;
        this.isShopCollapsed = true;
        this.isTeamsCollapsed = true;
    }
}
