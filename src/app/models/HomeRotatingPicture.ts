import { ModelWithImage } from './base/ModelWithImage';

export class HomeRotatingPicture extends ModelWithImage {
    id?: number;

    constructor(picture?: string, order?: number) {
        super(picture, order);
    }
}
