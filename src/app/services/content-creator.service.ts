import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentCreator } from '../models/ContentCreator';

@Injectable({
    providedIn: 'root'
})
export class ContentCreatorService {
    private url = `http://localhost:8080/api/contentCreator`;
    private adminUrl = `http://localhost:8080/api/admin/contentCreator`;

    constructor(private httpClient: HttpClient) {}

    public getAllContentCreators(): Observable<ContentCreator[]> {
        const url = `${this.url}/list`;
        return this.httpClient.get<ContentCreator[]>(url);
    }

    public getOneContentCreator(id: number): Observable<ContentCreator> {
        const url = `${this.url}/${id}`;
        return this.httpClient.get<ContentCreator>(url);
    }

    public addNewContentCreator(contentCreator: ContentCreator): Observable<boolean> {
        const url = `${this.adminUrl}/new`;
        return this.httpClient.post<boolean>(url, contentCreator).pipe(
            tap((data) => {
                console.log('Added new content creator -> ' + data);
            })
        );
    }

    public editExistingContentCreator(
        id: number,
        contentCreator: ContentCreator
    ): Observable<boolean> {
        const url = `${this.adminUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, contentCreator).pipe(
            tap((data) => {
                console.log('Edited existing content creator -> ' + data);
            })
        );
    }

    public deleteExistingContentCreator(id: number): Observable<any> {
        const url = `${this.adminUrl}/${id}`;
        return this.httpClient.delete<ContentCreator>(url);
    }
}
