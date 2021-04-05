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
    orderAmount: string;
    orderStatus: string;
    products: ProductInOrder[];
}
