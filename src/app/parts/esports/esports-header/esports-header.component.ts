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

	updateSubscription: Subscription;
	private updateTerms = new Subject<ProductInOrder>();

	model: any = {
		username: '',
		password: '',
		remembered: false
	}
	isInvalid: boolean = false;

	constructor(private userService: UserService, private cartService: CartService, 
		private cartNotifyService: CartNotifyService) {

	}

	ngOnInit(): void {
		this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
		this.getCart();
		this.cartNotifyService.obs.subscribe(() => this.getCart());
		this.updateSubscription = this.updateTerms.pipe(
			debounceTime(300), 
			switchMap((productInOrder: ProductInOrder) => this.cartService.update(productInOrder)))
			.subscribe(prod => {
				if (!prod) { throw new Error(); }
			},
				_ => console.log('Update Item Failed')
			);
	}

	ngOnDestroy(): void {
		if(!this.currentUser){
		  this.cartService.storeLocalCart();
		}
		this.currentUserSubscription.unsubscribe();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// CART
	//////////////////////////////////////////////////////////////////////////////////////////////////

	getCart() {
		this.cartService.getCart().subscribe(cart => {
			this.cart = cart;
		})
	}

	removeFromCart(product: ProductInOrder) {
		this.cartService.remove(product).subscribe(data => {
			console.log("Item removed.")
		},
		error => {
			console.log("Failed to remove item.")
		})
	}

	increaseCount(product: ProductInOrder){
		product.count++;
		if(this.currentUser) {
			this.updateTerms.next(product);
		}
	}
  
	decreaseCount(product: ProductInOrder){
		if(product.count > 0) {
			product.count--;
			if(this.currentUser) {
				this.updateTerms.next(product);
			}
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