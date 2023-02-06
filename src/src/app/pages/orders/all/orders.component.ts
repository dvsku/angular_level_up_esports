import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { faAngleDown, faFile, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { OrderStatus } from 'src/app/enums/OrderStatus';
import { UserService } from 'src/app/services/user.service';
import { JwtResponse } from 'src/app/models/JwtResponse';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit, OnDestroy {
    public isFiltersCollapsed = true;

    faArrowDown = faAngleDown;
    faFileInvoice = faFile;
    faCheck = faCheck;
    faRemove = faTimes;

    private orders: any;
    private ordersSubscription: Subscription;
    displayedOrders: Order[];

    public page = 1;
    public pageMax = 1;
    private perPage = 10;

    public OrderStatus = OrderStatus;
    public currentUser: JwtResponse;

    constructor(private ordersService: OrderService, private userService: UserService) {}

    ngOnInit(): void {
        this.getOrders();
        this.currentUser = this.userService.getCurrentUser();
    }

    private getOrders() {
        this.ordersService.getPageOrders(this.page, this.perPage).then((orders) => {
            this.orders = orders;
            this.pageMax = orders.totalPages;
            this.setDisplayedOrders();
        });
    }

    cancelOrder(order: Order) {
        this.ordersService.cancelOrder(order.orderId).then(
            (success) => {
                if (success) {
                    this.getOrders();
                } else {
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    finishOrder(order: Order) {
        this.ordersService.finishOrder(order.orderId).then(
            (success) => {
                if (success) {
                    this.getOrders();
                    console.log('order finished');
                } else {
                    console.log("can't finish order");
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    changePage(page: number) {
        this.page = page;
        this.getOrders();
    }

    previousPage() {
        if (this.page > 1) {
            this.page--;
            this.getOrders();
        }
    }

    nextPage() {
        if (this.page < this.pageMax) {
            this.page++;
            this.getOrders();
        }
    }

    counter(i = 1) {
        return new Array(i);
    }

    private setDisplayedOrders() {
        if (this.orders !== undefined) {
            this.displayedOrders = this.orders.content;
        }
    }

    ngOnDestroy(): void {
        if (this.ordersSubscription !== null && this.ordersSubscription !== undefined) {
            this.ordersSubscription.unsubscribe();
        }
    }
}
