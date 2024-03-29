import { Coupon } from './Coupon';
import { ProductInOrder } from './ProductInOrder';

export class Order {
    orderId: number;
    buyerEmail: string;
    buyerName: string;
    buyerLastName: string;
    buyerPhone: string;
    buyerCity: string;
    buyerStreetAndNumber: string;
    buyerZip: number;
    buyerCountry: string;
    orderAmount: string;
    orderAmountInEuro: string;
    orderStatus: string;
    createTime: string;
    products: ProductInOrder[];
    coupon: Coupon;

    constructor(order?: Order) {
        this.orderStatus = '0';
        if (order !== null && order !== undefined) {
            this.orderId = order.orderId;
            this.buyerEmail = order.buyerEmail;
            this.buyerName = order.buyerName;
            this.buyerLastName = order.buyerLastName;
            this.buyerPhone = order.buyerPhone;
            this.buyerCity = order.buyerCity;
            this.buyerStreetAndNumber = order.buyerStreetAndNumber;
            this.buyerZip = order.buyerZip;
            this.orderAmount = order.orderAmount;
            this.orderAmountInEuro = order.orderAmountInEuro;
            this.orderStatus = order.orderStatus;
            this.products = order.products;
            this.buyerCountry = order.buyerCountry;
        }
    }
}
