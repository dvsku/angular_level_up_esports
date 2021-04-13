import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { User } from 'src/app/models/User';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    faArrowLeft = faAngleLeft;

    private cartProducts: ProductInOrder[];
    private cartProductsObs: Observable<ProductInOrder[]>;
    private currentUserObs: Observable<JwtResponse>;
    private combinedSubscription: Subscription;

    currentUser: JwtResponse;
    user: User;
    order: Order = new Order();

    public changeInfo = false;

    constructor(private userService: UserService, private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.cartProductsObs = this.cartService.getCart();
        this.currentUserObs = this.userService.currentUser;

        this.combinedSubscription = combineLatest([this.cartProductsObs, this.currentUserObs])
            .pipe(
                map(([cartProducts, jwtUser]) => {
                    if (cartProducts.length === 0) {
                        this.router.navigate(['/esports']);
                    }
                    this.cartProducts = cartProducts;
                    this.order.products = this.cartProducts;
                    this.order.orderAmount = this.order.orderAmount = this.order.products
                        .reduce((sum, current) => sum + current.count * current.productPrice, 0)
                        .toString();

                    if (jwtUser !== this.currentUser) {
                        this.currentUser = jwtUser;

                        if (this.currentUser !== null && this.currentUser !== undefined) {
                            this.changeInfo = false;
                            this.userService
                                .getUserProfile(this.currentUser.account)
                                .toPromise()
                                .then((user) => {
                                    this.user = user;
                                    this.order.buyerName = this.user.firstName;
                                    this.order.buyerLastName = this.user.lastName;
                                    this.order.buyerEmail = this.user.email;
                                    this.order.buyerCity = this.user.city;
                                    this.order.buyerStreetAndNumber = this.user.streetAndNumber;
                                    this.order.buyerZip = this.user.zip;
                                    this.order.buyerPhone = this.user.phone;
                                });
                        } else {
                            this.changeInfo = true;
                        }
                    }
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.combinedSubscription.unsubscribe();
    }

    changeInformation(): void {
        if (this.currentUser !== null) {
            // route to settings change
        } else {
            this.changeInfo = true;
        }
    }

    updateInformation(): void {
        this.changeInfo = false;
    }

    checkout(): void {
        this.cartService
            .checkout(this.order)
            .then(() => {
                this.cartService.clearCart();
                // toast
                // navigate
            })
            .catch((reason) => {
                console.log(reason.text);
            });
    }
}
