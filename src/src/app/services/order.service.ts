import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderUrl = environment.apiURL + `order`;

    constructor(private httpClient: HttpClient) {}

    getPageOrders(page = 1, perPage = 1): Promise<any> {
        return this.fetchPageOrders(page, perPage).then(
            (orders) => {
                return orders;
            },
            () => {
                return undefined;
            }
        );
    }

    private fetchPageOrders(page = 1, size = 10): Promise<any> {
        const url = `${this.orderUrl}/all?page=${page}&size=${size}`;
        return this.httpClient
            .get(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    getOrder(orderId: number): Promise<Order> {
        return this.fetchOrder(orderId).then(
            (order) => {
                return order;
            },
            () => {
                return undefined;
            }
        );
    }

    private fetchOrder(orderId: number): Promise<Order> {
        const url = `${this.orderUrl}/${orderId}`;
        return this.httpClient
            .get<Order>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    cancelOrder(orderId: number): Promise<boolean> {
        return this.cancelDatabaseOrder(orderId).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private cancelDatabaseOrder(id: number): Promise<boolean> {
        const url = `${this.orderUrl}/cancel/${id}`;
        return this.httpClient
            .patch<boolean>(url, null)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    finishOrder(orderId: number): Promise<boolean> {
        return this.finishDatabaseOrder(orderId).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private finishDatabaseOrder(id: number): Promise<boolean> {
        const url = `${this.orderUrl}/finish/${id}`;
        return this.httpClient
            .patch<boolean>(url, null)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }
}
