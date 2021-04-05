import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeRotatingPicture } from '../models/HomeRotatingPicture';

@Injectable({
    providedIn: 'root'
})
export class HomePictureService {
    private homePictureUrl = `http://localhost:8080/api/homePicture`;
    private homePictureAdminUrl = `http://localhost:8080/api/admin/homePicture`;

    constructor(private httpClient: HttpClient) {}

    public getOneHomePicture(id: number): Observable<HomeRotatingPicture> {
        const url = `${this.homePictureUrl}/${id}`;
        return this.httpClient.get<HomeRotatingPicture>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllHomePictures(): Observable<HomeRotatingPicture[]> {
        const url = `${this.homePictureUrl}/list`;
        return this.httpClient.get<HomeRotatingPicture[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public addNewHomePicture(
        homePicture: HomeRotatingPicture
    ): Observable<HomeRotatingPicture> {
        const url = `${this.homePictureAdminUrl}/new`;
        return this.httpClient.post<HomeRotatingPicture>(url, homePicture).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public editExistingHomePicture(
        id: number,
        homePicture: HomeRotatingPicture
    ): Observable<HomeRotatingPicture> {
        const url = `${this.homePictureAdminUrl}/${id}/edit`;
        return this.httpClient.put<HomeRotatingPicture>(url, homePicture).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public deleteExistingHomePicture(id: number): Observable<any> {
        const url = `${this.homePictureAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
