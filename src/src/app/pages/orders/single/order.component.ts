import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/enums/OrderStatus';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
    order: Order;

    public OrderStatus = OrderStatus;

    constructor(private activeRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.activeRoute.data.subscribe((data: { order: Order }) => {
            if (data.order === undefined || data.order === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.order = data.order;
            }
        });
    }
}
