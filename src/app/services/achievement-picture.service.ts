import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AchievementPicture } from '../models/AchievementPicture';

@Injectable({
    providedIn: 'root'
})
export class AchievementPictureService {
    private achievementPictureUrl = environment.apiURL + `achievement-picture`;
    private achievementPictureAdminUrl = environment.apiURL + `admin/achievement-picture`;
    constructor(private httpClient: HttpClient) {}

    public getOneAchievementPicture(achievementPictureId: number): Observable<AchievementPicture> {
        const url = `${this.achievementPictureUrl}/${achievementPictureId}`;
        return this.httpClient.get<AchievementPicture>(url).pipe(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tap((_data) => {
                // LOG
            })
        );
    }

    public getAllAchievementPicturesForAchievement(achievementId: number): Observable<AchievementPicture[]> {
        const url = `${this.achievementPictureUrl}/list/${achievementId}`;
        return this.httpClient.get<AchievementPicture[]>(url).pipe(
            tap((data) => {
                // LOG
            })
        );
    }

    public createAchievementPicture(achievementId: number, achievementPicture: AchievementPicture): Promise<boolean> {
        return this.addNewAchievementPicture(achievementId, achievementPicture).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    public addNewAchievementPicture(achievementId: number, achievementPicture: AchievementPicture): Promise<boolean> {
        const url = `${this.achievementPictureAdminUrl}/add/${achievementId}`;
        return this.httpClient
            .post<boolean>(url, achievementPicture)
            .toPromise()
            .then(
                (success) => {
                    return success;
                },
                () => {
                    return false;
                }
            );
    }

    public deleteAchievementPicture(achievementPictureId: number): Observable<boolean> {
        const url = `${this.achievementPictureAdminUrl}/delete/${achievementPictureId}`;
        return this.httpClient.delete<boolean>(url).pipe(
            tap((data) => {
                console.log('Uspesno izbrisana slika -> ' + data);
            })
        );
    }
}
