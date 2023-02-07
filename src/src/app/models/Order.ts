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

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }
}
