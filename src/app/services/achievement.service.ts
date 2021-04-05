import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Achievement } from '../models/Achievement';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {
    private achievementUrl = `http://localhost:8080/api/achievement`;
    private achievementAdminUrl = `http://localhost:8080/api/admin/achievement`;

    constructor(private httpClient: HttpClient) {}

    public getOneAchievement(id: number): Observable<Achievement> {
        const url = `${this.achievementUrl}/${id}`;
        return this.httpClient.get<Achievement>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllAchievementsForCategory(
        categoryNumber: number
    ): Observable<Achievement[]> {
        const url = `${this.achievementUrl}/category/${categoryNumber}`;
        return this.httpClient.get<Achievement[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public addNewAchievementInCategory(
        categoryNumber: number,
        achievement: Achievement
    ): Observable<Achievement> {
        const url = `${this.achievementAdminUrl}/new/category/${categoryNumber}`;
        return this.httpClient.post<Achievement>(url, achievement).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public editExistingAchievement(
        id: number,
        achievement: Achievement
    ): Observable<Achievement> {
        const url = `${this.achievementAdminUrl}/${id}/edit`;
        return this.httpClient.put<Achievement>(url, achievement).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public deleteExistingAchievement(id: number): Observable<any> {
        const url = `${this.achievementAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
