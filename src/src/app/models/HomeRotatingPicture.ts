import { ModelWithImage } from './base/ModelWithImage';

export class HomeRotatingPicture extends ModelWithImage {
    id?: number;

    public constructor(init?: Partial<HomeRotatingPicture>) {
        super(init.image, init.displayOrder);
        Object.assign(this, init);
    }
}
