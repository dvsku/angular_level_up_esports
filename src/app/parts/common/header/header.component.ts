import { Component, OnInit } from '@angular/core';
import { faBars, faAngleDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductService } from 'src/app/services/product.service';
import { ImagesService } from 'src/app/services/images.service';
import { JwtResponse } from 'src/app/models/JwtResponse';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    public isMenuCollapsed = true;
    public isShopCollapsed = true;
    public isTeamsCollapsed = true;
    public isCartCollapsed = true;
    faBars = faBars;
    faArrowDown = faAngleDown;
    faCart = faShoppingCart;

    currentUser: JwtResponse;

    cart: ProductInOrder[];
    categories: ProductCategory[];
    featuredProducts: ProductInfo[];

    private currentUserSubscription: Subscription;
    private productsSubscription: Subscription;
    private cartProductsSubscription: Subscription;
    private categoriesSubscription: Subscription;

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
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.currentUserSubscription = this.userService.getCurrentUserObservable().subscribe((user) => {
            this.currentUser = user;
        });
        this.categoriesSubscription = this.productCategoryService.getProductCategories().subscribe((cats) => {
            this.categories = cats;
        });
        this.productsSubscription = this.productService.getProducts().subscribe((prods) => {
            if (prods !== undefined && prods !== null) {
                this.featuredProducts = prods
                    .filter((x) => x.productStatus === 0)
                    .sort((a, b) => a.sold - b.sold)
                    .slice(0, 3);
            }
        });
        this.cartProductsSubscription = this.cartService.getCart().subscribe((prods) => {
            this.cart = prods;
        });
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        this.productsSubscription.unsubscribe();
        this.cartProductsSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // CART
    //////////////////////////////////////////////////////////////////////////////////////////////////

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
        this.userService.signOut();
    }

    onSubmit(): void {
        this.isInvalid = false;
        this.userService.signIn(this.model).then((jwtResponse) => {
            if (jwtResponse) {
                //this.model.username = '';
                //this.model.password = '';
                //this.model.remembered = false;
                //this.currentUser = jwtResponse;
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
