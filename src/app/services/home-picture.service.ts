import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { publishReplay, refCount, takeLast } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { HomeRotatingPicture } from '../models/HomeRotatingPicture';

@Injectable({
    providedIn: 'root'
})
export class HomePictureService {
    private homePictureUrl = `http://localhost:8080/api/homePicture`;
    private homePictureAdminUrl = `http://localhost:8080/api/admin/homePicture`;

    private hrps: HomeRotatingPicture[] = null;
    private hrpsSubject: BehaviorSubject<HomeRotatingPicture[]> = new BehaviorSubject<HomeRotatingPicture[]>(this.hrps);
    private hrpsObs = this.hrpsSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    getHomeRotatingPictures(): Observable<HomeRotatingPicture[]> {
        if (this.hrps === null) {
            this.fetchHomeRotatingPictures().subscribe((pictures) => {
                this.hrps = pictures;

                this.hrpsSubject.next(this.hrps);
                this.hrpsObs.pipe(publishReplay(1), refCount());
                console.log('Fetched pictures from server.');
            });
        }
        return this.hrpsObs;
    }

    private fetchHomeRotatingPictures(): Observable<HomeRotatingPicture[]> {
        const url = `${this.homePictureUrl}/list`;
        return this.httpClient.get<HomeRotatingPicture[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    addHomeRotatingPicture(picture: HomeRotatingPicture): Observable<boolean> {
        const success: Subject<boolean> = new Subject<boolean>();
        this.addDatabaseHomeRotatingPicture(picture).subscribe(
            (insertedId) => {
                if (insertedId !== -1) {
                    picture.id = insertedId;
                    if (this.hrpsObs) {
                        if (this.hrps !== null && this.hrps !== undefined) {
                            this.hrps.push(picture);
                            this.hrpsSubject.next(this.hrps);
                        }
                    }
                    success.next(true);
                } else {
                    console.log('Failed to add home rotating picture: id === -1');
                    success.next(false);
                }
            },
            (error) => {
                console.log('Failed to add home rotating picture: ' + error.message);
                success.next(false);
            }
        );
        return success.asObservable();
    }

    private addDatabaseHomeRotatingPicture(homePicture: HomeRotatingPicture): Observable<number> {
        const url = `${this.homePictureAdminUrl}/new`;
        return this.httpClient.post<number>(url, homePicture).pipe(
            tap((data) => {
                console.log('Added new home picture -> ' + data);
            })
        );
    }

    deleteHomeRotatingPicture(picture: HomeRotatingPicture): Observable<boolean> {
        const success: Subject<boolean> = new Subject<boolean>();
        this.deleteDatabaseHomeRotatingPicture(picture.id).subscribe(
            () => {
                if (this.hrpsObs) {
                    if (this.hrps !== null && this.hrps !== undefined) {
                        const index = this.hrps.findIndex((x) => x.id === picture.id);
                        if (index !== -1) {
                            this.hrps.splice(index, 1);
                            this.hrpsSubject.next(this.hrps);
                        }
                    }
                }
                success.next(true);
            },
            (error) => {
                console.log('Failed to remove home rotating picture: ' + error.message);
                success.next(false);
            }
        );
        return success.asObservable();
    }

    private deleteDatabaseHomeRotatingPicture(id: number): Observable<any> {
        const url = `${this.homePictureAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }

    updateHomeRotatingPicture(picture: HomeRotatingPicture): Observable<boolean> {
        const success: Subject<boolean> = new Subject<boolean>();
        this.updateDatabaseHomeRotatingPicture(picture.id, picture).subscribe(
            () => {
                let pictures: HomeRotatingPicture[];
                if (this.hrpsObs) {
                    this.hrpsObs.pipe(takeLast(1)).subscribe((pics) => {
                        pictures = pics;
                        if (pictures !== null && pictures !== undefined) {
                            const index = pictures.findIndex((x) => x.id === picture.id);
                            if (index !== -1) {
                                pictures[index] = picture;
                                this.hrpsSubject.next(pictures);
                            }
                        }
                    });
                }
                success.next(true);
            },
            (error) => {
                console.log('Failed to remove home rotating picture: ' + error.message);
                success.next(false);
            }
        );
        return success.asObservable();
    }

    private updateDatabaseHomeRotatingPicture(id: number, homePicture: HomeRotatingPicture): Observable<boolean> {
        const url = `${this.homePictureAdminUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, homePicture).pipe(
            tap((data) => {
                console.log('Edited existing home picture -> ' + data);
            })
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
