import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeRotatingPicture } from '../models/HomeRotatingPicture';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomePictureService {
    private homePictureUrl = environment.apiURL + `homePicture`;
    private homePictureAdminUrl = environment.apiURL + `admin/homePicture`;

    private hrps: HomeRotatingPicture[] = [
        new HomeRotatingPicture({ id: 1, image: 'carousel/carousel_1.jpg', displayOrder: 0 })
    ];
    private hrpsSubject: BehaviorSubject<HomeRotatingPicture[]> = new BehaviorSubject<HomeRotatingPicture[]>(this.hrps);
    private hrpsObs = this.hrpsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getHomeRotatingPictures(): Observable<HomeRotatingPicture[]> {
        return this.hrpsObs;
    }

    createHomeRotatingPicture(picture: HomeRotatingPicture): Promise<boolean> {
        return this.createDatabaseHomeRotatingPicture(picture).then(
            (insertedId) => {
                if (insertedId !== -1) {
                    picture.id = insertedId;
                    if (this.hrpsObs && this.hrps) {
                        this.hrps.push(picture);
                        this.hrpsSubject.next(this.hrps);
                    }
                }
                return insertedId !== -1;
            },
            () => {
                return false;
            }
        );
    }

    private createDatabaseHomeRotatingPicture(homePicture: HomeRotatingPicture): Promise<number> {
        const url = `${this.homePictureAdminUrl}/new`;
        return this.httpClient
            .post<number>(url, homePicture)
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

    removeHomeRotatingPicture(picture: HomeRotatingPicture): Promise<boolean> {
        return this.removeDatabaseHomeRotatingPicture(picture.id).then(
            (success) => {
                if (this.hrpsObs && this.hrps) {
                    const index = this.hrps.findIndex((x) => x.id === picture.id);
                    if (index !== -1) {
                        this.hrps.splice(index, 1);
                        this.hrpsSubject.next(this.hrps);
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private removeDatabaseHomeRotatingPicture(id: number): Promise<boolean> {
        const url = `${this.homePictureAdminUrl}/${id}`;
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

    updateHomeRotatingPicture(picture: HomeRotatingPicture): Promise<boolean> {
        return this.updateDatabaseHomeRotatingPicture(picture.id, picture).then(
            (success) => {
                if (success) {
                    if (this.hrpsObs && this.hrps) {
                        const index = this.hrps.findIndex((x) => x.id === picture.id);
                        if (index !== -1) {
                            this.hrps[index] = picture;
                            this.hrpsSubject.next(this.hrps);
                        }
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private updateDatabaseHomeRotatingPicture(id: number, homePicture: HomeRotatingPicture): Promise<boolean> {
        const url = `${this.homePictureAdminUrl}/${id}/edit`;
        return this.httpClient
            .put<boolean>(url, homePicture)
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	NOT USED
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private getOneHomePicture(id: number): Observable<HomeRotatingPicture> {
        const url = `${this.homePictureUrl}/${id}`;
        return this.httpClient.get<HomeRotatingPicture>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }
}
