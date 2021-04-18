import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from '../models/Order';
import { OrderService } from '../services/order.service';

@Injectable({
    providedIn: 'root'
})
export class OrderResolver implements Resolve<Order> {
    constructor(private orderService: OrderService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Order> {
        const id = route.params['id'];
        return this.orderService.getOrder(id).then(
            (product) => {
                return product;
            },
            () => {
                return undefined;
            }
        );
    }
}
