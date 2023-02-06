import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    environment = environment;

    getImage(image: string): string {
        if (image === null || image === undefined) return '/assets/no-image.png';
        if (image.startsWith('data')) return image;
        return environment.imagesURL + image;
    }
}
