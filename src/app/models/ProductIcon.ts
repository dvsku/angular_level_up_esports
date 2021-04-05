export class ProductIcon {
    id?: number;
    productIcon: string;
    iconOrder?: number;

    constructor(id?: number, productIcon?: string, iconOrder?: number) {
        this.id = id;
        this.productIcon = productIcon;
        this.iconOrder = iconOrder;
    }
}
