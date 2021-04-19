import { ModelWithImage } from './base/ModelWithImage';

export class Partner extends ModelWithImage {
    id?: number;
    name?: string;
    description?: string;
    linkToWebsite?: string;

    constructor(name?: string, image: string, description?: string, imageOrder: number, linkToWebsite: string) {
        super(image, imageOrder);
        this.name = name;
        this.description = description;
        this.linkToWebsite = linkToWebsite;
    }
}
