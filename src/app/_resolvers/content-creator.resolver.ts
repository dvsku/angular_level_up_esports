import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContentCreator } from '../models/ContentCreator';
import { ContentCreatorService } from '../services/content-creator.service';

@Injectable({
    providedIn: 'root'
})
export class ContentCreatorResolver implements Resolve<ContentCreator> {
    constructor(private creatorService: ContentCreatorService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<ContentCreator> {
        const id = route.params['id'];
        return this.creatorService.getContentCreator(id).then(
            (creator) => {
                return creator;
            },
            () => {
                return undefined;
            }
        );
    }
}
