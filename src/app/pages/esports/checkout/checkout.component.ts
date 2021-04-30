import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private userService: UserService,
        private cartService: CartService,
        private router: Router,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.cartProductsObs = this.cartService.getCart();
        this.currentUserObs = this.userService.getCurrentUserObservable();

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
                            this.userService.getUserProfile(this.currentUser.account).then((user) => {
                                if (user) {
                                    this.user = user;
                                    this.order.buyerName = this.user.firstName;
                                    this.order.buyerLastName = this.user.lastName;
                                    this.order.buyerEmail = this.user.email;
                                    this.order.buyerCity = this.user.city;
                                    this.order.buyerStreetAndNumber = this.user.streetAndNumber;
                                    this.order.buyerZip = this.user.zip;
                                    this.order.buyerPhone = this.user.phone;
                                } else {
                                    this.changeInfo = true;
                                }
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
            this.router.navigate(['/dashboard']);
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
                if (this.currentUser) {
                    this.router.navigate(['/esports/shop/orders']).then(() => {
                        this.toastrService.success('Order placed.');
                    });
                } else {
                    this.router.navigate(['/esports']).then(() => {
                        this.toastrService.success('Order placed.');
                    });
                }
            })
            .catch((reason) => {
                this.toastrService.error('Failed to place order, please try again later.');
                console.log(reason.text);
            });
    }
}
