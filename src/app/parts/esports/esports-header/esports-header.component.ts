import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { faBars, faAngleDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { CartNotifyService } from 'src/app/services/cart-notify.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ProductStorageService } from 'src/app/services-cache/product-storage.service';

@Component({
  selector: 'app-esports-header',
  templateUrl: './esports-header.component.html',
  styleUrls: ['./esports-header.component.sass']
})
export class EsportsHeaderComponent implements OnInit {

	public isMenuCollapsed: boolean = true;
	public isShopCollapsed: boolean = true;
	public isTeamsCollapsed: boolean = true;
	public isCartCollapsed: boolean = true;
	faBars = faBars;
	faArrowDown = faAngleDown
	faCart = faShoppingCart

	currentUserSubscription: Subscription;
	currentUser: JwtResponse;

	cart: ProductInOrder[];
	categories: ProductCategory[];
	featuredProducts: ProductInfo[];


	model: any = {
		username: '',
		password: '',
		remembered: false
	}
	isInvalid: boolean = false;

	constructor(private userService: UserService, private cartService: CartService, private productCategoryService: ProductCategoryService, private productStorageService: ProductStorageService,
		private cartNotifyService: CartNotifyService) {

	}

	ngOnInit(): void {
		this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
		this.productCategoryService.getProductCategories().subscribe(cats => {
			this.categories = cats;
		})
		this.productStorageService.getProducts().subscribe(prods => {
			this.featuredProducts = prods.sort((a, b) => a.sold - b.sold).slice(0, 3);
			console.log(this.featuredProducts)
		})
		this.getCart();
		this.cartNotifyService.obs.subscribe(() => this.getCart());
	}

	ngOnDestroy(): void {
		this.currentUserSubscription.unsubscribe();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// CART
	//////////////////////////////////////////////////////////////////////////////////////////////////

	getCart() {
		this.cart = this.cartService.getCart();
	}

	removeFromCart(product: ProductInOrder) {
		this.cartService.removeProductFromCart(product);
	}

	increaseCount(product: ProductInOrder){
		product.count++;
	}
  
	decreaseCount(product: ProductInOrder){
		if(product.count > 0) {
			product.count--;
		}
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// AUTH
	//////////////////////////////////////////////////////////////////////////////////////////////////

	logout() {
		this.userService.logout();
	}

	onSubmit() {
		this.isInvalid = false;
		this.userService.login(this.model).subscribe(jwtResponse => {
			if(jwtResponse){
				this.model.username = "";
				this.model.password = "";
				this.model.remembered = false;
				this.currentUser = jwtResponse;
				//this.router.navigateByUrl('/esports');
			}
			else {
				this.isInvalid = true;
			}
		});
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// DROPDOWN/COLLAPSE CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////////

	toggleMenu() {
		this.isMenuCollapsed = !this.isMenuCollapsed;
		this.isShopCollapsed = true;
		this.isTeamsCollapsed = true;
		this.isCartCollapsed = true;
	}

	toggleShop() {
		this.isShopCollapsed = !this.isShopCollapsed;
		this.isTeamsCollapsed = true;
		this.isCartCollapsed = true;
	}

	toggleTeams() {
		this.isShopCollapsed = true;
		this.isTeamsCollapsed = !this.isTeamsCollapsed;
		this.isCartCollapsed = true;
	}

	toggleCart() {
		this.isCartCollapsed = !this.isCartCollapsed;
		this.isShopCollapsed = true;
		this.isTeamsCollapsed = true;
	}
}