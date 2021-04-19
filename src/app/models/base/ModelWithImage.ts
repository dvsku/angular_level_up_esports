export abstract class ModelWithImage {
    image?: string;
    displayOrder?: number;

    constructor(image: string, imageOrder: number) {
        this.image = image;
        this.displayOrder = imageOrder;
    }
}
