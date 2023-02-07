import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    environment = environment;

    getImage(image: string): string {
        return '/assets/' + image;
    }
}
