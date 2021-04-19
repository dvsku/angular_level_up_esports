import { ModelWithImage } from './base/ModelWithImage';

export class ProductIcon extends ModelWithImage {
    id?: number;

    constructor(id?: number, productIcon?: string, iconOrder?: number) {
        super(productIcon, iconOrder);
        this.id = id;
    }
}
