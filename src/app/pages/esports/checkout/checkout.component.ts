import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { ProductInOrder } from 'src/app/models/ProductInOrder';
import { User } from 'src/app/models/User';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
    faArrowLeft = faAngleLeft;
    private currentUserSubscription: Subscription;
    currentUser: JwtResponse;
    user: User;

    order: Order;
    tempOrder: Order = new Order();

    public changeInfo = false;

    constructor(private userService: UserService, private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.currentUserSubscription = this.userService.currentUser.subscribe((jwtUser) => {
            this.currentUser = jwtUser;
            if (this.currentUser !== null) {
                this.userService.getUserProfile(this.currentUser.account).subscribe((user) => {
                    this.user = user;
                    this.order = new Order();
                    this.order.buyerName = this.user.firstName;
                    this.order.buyerLastName = this.user.lastName;
                    this.order.buyerEmail = this.user.email;
                    this.order.buyerCity = this.user.city;
                    this.order.buyerStreetAndNumber = this.user.streetAndNumber;
                    this.order.buyerZip = this.user.zip;
                    this.order.buyerPhone = this.user.phone;
                    this.order.products = this.cartService.getCart();
                    this.order.orderAmount = this.order.products
                        .reduce((sum, current) => sum + current.count * current.productPrice, 0)
                        .toString();
                });
            } else {
                this.changeInfo = true;
            }
        });
    }

    changeInformation(): void {
        if (this.currentUser !== null) {
            // route to settings change
        } else {
            this.changeInfo = true;
        }
    }

    updateInformation(): void {
        this.order = new Order(this.tempOrder);
        this.order.products = this.cartService.getCart();
        this.order.orderAmount = this.order.products
            .reduce((sum, current) => sum + current.count * current.productPrice, 0)
            .toString();
        this.changeInfo = false;
    }
}
