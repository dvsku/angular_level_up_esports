import { ModelWithImage } from './base/ModelWithImage';

export class Partner extends ModelWithImage {
    id?: number;
    name?: string;
    picture?: string;
    description?: string;
    partnerOrder?: number;

    constructor(name?: string, image?: string, description?: string, imageOrder?: number) {
        super(image, imageOrder);
        this.name = name;
        this.description = description;
    }
}
