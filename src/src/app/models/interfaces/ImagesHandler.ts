import { ModelWithImage } from '../base/ModelWithImage';

export interface ImagesHandler {
    createImage(image: string): void;
    removeImage(image: ModelWithImage): void;
    reorderImages(): void;
}
