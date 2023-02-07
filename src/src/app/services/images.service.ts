import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {
    environment = environment;

    constructor(@Inject(APP_BASE_HREF) private baseHref: string) {}

    getImage(image: string): string {
        return this.baseHref + 'assets/' + image;
    }
}
