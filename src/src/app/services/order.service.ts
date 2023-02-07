import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { ProductInOrder } from '../models/ProductInOrder';
import { ProductInfo } from '../models/ProductInfo';
import { ProductInfoSize } from '../models/ProductInfoSize';
import { ProductIcon } from '../models/ProductIcon';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderUrl = environment.apiURL + `order`;

    private orders = {
        totalPages: 1,
        content: [
            new Order({
                orderId: 1,
                buyerEmail: 'email@email.com',
                buyerName: 'John',
                buyerLastName: 'Smith',
                buyerPhone: '+381344343',
                buyerCity: 'Novi Sad',
                buyerStreetAndNumber: 'Mise Dimtrijevica 1',
                buyerZip: 21000,
                buyerCountry: 'Serbia',
                orderAmount: '1000',
                orderAmountInEuro: '10',
                orderStatus: '0',
                createTime: '2021-05-18 03:41:40.937825',
                products: [
                    new ProductInOrder(
                        1,
                        new ProductInfo({
                            productId: 1,
                            productName: 'Level Up Hoodie',
                            productPrice: 1000,
                            priceInEuros: 10,
                            productDescription:
                                'High quality hoodie made from 100% cotton with Level Up esports branding.',
                            productStatus: 0,
                            categoryType: 0,
                            sold: 1,
                            productInfoSizes: [
                                new ProductInfoSize(1, 'S'),
                                new ProductInfoSize(2, 'M'),
                                new ProductInfoSize(3, 'L')
                            ],
                            productInfoIcons: [
                                new ProductIcon(1, 'products/hoodie_2_front.jpg', 0),
                                new ProductIcon(2, 'products/hoodie_2_back.jpg', 1)
                            ]
                        }),
                        1,
                        'M'
                    )
                ]
            })
        ]
    };

    constructor(private httpClient: HttpClient) {}

    getPageOrders(page = 1, perPage = 1): Promise<any> {
        return Promise.resolve(this.orders);
    }

    getOrder(orderId: number): Promise<Order> {
        let order = undefined;
        if (this.orders !== null && this.orders !== undefined) {
            order = this.orders.content.find((x) => x.orderId == orderId);
        }
        if (order === undefined) {
            return Promise.reject();
        } else {
            return Promise.resolve(order);
        }
    }

    cancelOrder(orderId: number): Promise<boolean> {
        return Promise.resolve(true);
    }

    finishOrder(orderId: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
