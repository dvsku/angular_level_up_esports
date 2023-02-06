import { ProductInOrderDto } from './ProductInOrderDto';

export class OrderDto {
    buyerEmail: string;
    buyerName: string;
    buyerLastName: string;
    buyerPhone: string;
    buyerCity: string;
    buyerStreetAndNumber: string;
    buyerZip: number;
    buyerCountry: string;
    orderStatus: string;
    createTime: string;
    products: ProductInOrderDto[];
    couponId: number;

    constructor(
        buyerEmail?: string,
        buyerName?: string,
        buyerLastName?: string,
        buyerPhone?: string,
        buyerCity?: string,
        buyerStreetAndNumber?: string,
        buyerZip?: number,
        orderStatus?: string,
        buyerCountry?: string
    ) {
        this.buyerEmail = buyerEmail;
        this.buyerName = buyerName;
        this.buyerLastName = buyerLastName;
        this.buyerPhone = buyerPhone;
        this.buyerCity = buyerCity;
        this.buyerStreetAndNumber = buyerStreetAndNumber;
        this.buyerZip = buyerZip;
        this.orderStatus = orderStatus;
        this.buyerCountry = buyerCountry;
    }
}
