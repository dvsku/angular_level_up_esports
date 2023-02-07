import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentCreator } from '../models/ContentCreator';

@Injectable({
    providedIn: 'root'
})
export class ContentCreatorService {
    private creators: ContentCreator[] = [
        new ContentCreator(
            1,
            'Nina',
            'Marković',
            'Iamninna',
            '',
            'content_creators/content_creators_1.jpg',
            'https://www.twitch.tv/iamninna',
            '',
            '',
            '',
            'https://www.instagram.com/iamninna/',
            '',
            'Serbian'
        )
    ];
    private creatorsSubject: BehaviorSubject<ContentCreator[]> = new BehaviorSubject<ContentCreator[]>(this.creators);
    private creatorsObs: Observable<ContentCreator[]> = this.creatorsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getContentCreators(): Observable<ContentCreator[]> {
        return this.creatorsObs;
    }

    public getContentCreator(id: number): Promise<ContentCreator> {
        let creator = undefined;
        if (this.creators !== null && this.creators !== undefined) {
            creator = this.creators.find((x) => x.id === +id);
        }
        if (creator === undefined) {
            return Promise.reject();
        } else {
            return Promise.resolve(creator);
        }
    }

    public createContentCreator(contentCreator: ContentCreator): Promise<boolean> {
        return Promise.resolve(true);
    }

    public updateContentCreator(contentCreator: ContentCreator): Promise<boolean> {
        return Promise.resolve(true);
    }

    public removeContentCreator(id: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
