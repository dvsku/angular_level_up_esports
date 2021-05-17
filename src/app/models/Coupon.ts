export class Coupon {
    id?: number;
    name?: string;
    discount?: number;
    validUntil?: string;

    constructor(id?: number, name?: string, discount?: number, validUntil?: string) {
        this.id = id;
        this.name = name;
        this.discount = discount;
        this.validUntil = validUntil;
    }
}
