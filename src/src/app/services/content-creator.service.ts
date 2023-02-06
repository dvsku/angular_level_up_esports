import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { ContentCreator } from '../models/ContentCreator';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContentCreatorService {
    private url = environment.apiURL + `contentCreator`;
    private adminUrl = environment.apiURL + `admin/contentCreator`;

    private creators: ContentCreator[] = null;
    private creatorsSubject: BehaviorSubject<ContentCreator[]> = new BehaviorSubject<ContentCreator[]>(this.creators);
    private creatorsObs: Observable<ContentCreator[]> = this.creatorsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getContentCreators(): Observable<ContentCreator[]> {
        if (this.creators === null) {
            this.fetchContentCreators().subscribe((creators) => {
                this.creators = creators;
                this.creatorsSubject.next(this.creators);
                this.creatorsObs.pipe(publishReplay(1), refCount());
            });
        }
        return this.creatorsObs;
    }

    private fetchContentCreators(): Observable<ContentCreator[]> {
        const url = `${this.url}/list`;
        return this.httpClient.get<ContentCreator[]>(url);
    }

    public getContentCreator(id: number): Promise<ContentCreator> {
        let creator = undefined;
        if (this.creators !== null && this.creators !== undefined) {
            creator = this.creators.find((x) => x.id === +id);
        }
        if (creator === undefined) {
            return this.fetchContentCreator(id)
                .then((person) => {
                    return person;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            return Promise.resolve(creator);
        }
    }

    private fetchContentCreator(id: number): Promise<ContentCreator> {
        const url = `${this.url}/${id}`;
        return this.httpClient
            .get<ContentCreator>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public createContentCreator(contentCreator: ContentCreator): Promise<boolean> {
        return this.createDatabaseContentCreator(contentCreator).then(
            (creatorId) => {
                if (creatorId !== -1) {
                    if (this.creatorsObs) {
                        if (this.creators !== null && this.creators !== undefined) {
                            contentCreator.id = creatorId;
                            this.creators.push(contentCreator);
                            this.creatorsSubject.next(this.creators);
                        }
                    }
                    return true;
                }
                return false;
            },
            () => {
                return false;
            }
        );
    }

    private createDatabaseContentCreator(contentCreator: ContentCreator): Promise<number> {
        const url = `${this.adminUrl}/new`;
        return this.httpClient
            .post<number>(url, contentCreator)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public updateContentCreator(contentCreator: ContentCreator): Promise<boolean> {
        return this.updateDatabaseContentCreator(contentCreator).then(
            (success) => {
                if (success && this.creatorsObs && this.creators) {
                    const index = this.creators.findIndex((x) => x.id === contentCreator.id);
                    if (index !== -1) {
                        this.creators[index] = contentCreator;
                        this.creatorsSubject.next(this.creators);
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private updateDatabaseContentCreator(contentCreator: ContentCreator): Promise<boolean> {
        const url = `${this.adminUrl}/${contentCreator.id}/edit`;
        return this.httpClient
            .put<boolean>(url, contentCreator)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public removeContentCreator(id: number): Promise<boolean> {
        return this.removeDatabaseContentCreator(id).then(
            (success) => {
                if (success && this.creatorsObs && this.creators) {
                    const index = this.creators.findIndex((x) => x.id === id);
                    if (index !== -1) {
                        this.creators.splice(index, 1);
                        this.creatorsSubject.next(this.creators);
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private removeDatabaseContentCreator(id: number): Promise<boolean> {
        const url = `${this.adminUrl}/${id}`;
        return this.httpClient
            .delete<boolean>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }
}
