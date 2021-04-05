import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AchievementCategory } from '../models/AchievementCategory';

@Injectable({
    providedIn: 'root'
})
export class AchievementCategoryService {
    private achievementCategoryUrl = `http://localhost:8080/api/achievementCategory`;
    private achievementCategoryAdminUrl = `http://localhost:8080/api/admin/achievementCategory`;

    constructor(private httpClient: HttpClient) {}

    public getOneAchievementCategory(id: number): Observable<AchievementCategory> {
        const url = `${this.achievementCategoryUrl}/${id}`;
        return this.httpClient.get<AchievementCategory>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllAchievementCategories(): Observable<AchievementCategory[]> {
        const url = `${this.achievementCategoryUrl}/list`;
        return this.httpClient.get<AchievementCategory[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public addNewAchievementCategory(
        achievementCategory: AchievementCategory
    ): Observable<AchievementCategory> {
        const url = `${this.achievementCategoryAdminUrl}/new`;
        return this.httpClient.post<AchievementCategory>(url, achievementCategory).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public editExistingAchievementCategory(
        id: number,
        achievementCategory: AchievementCategory
    ): Observable<AchievementCategory> {
        const url = `${this.achievementCategoryAdminUrl}/${id}/edit`;
        return this.httpClient.put<AchievementCategory>(url, achievementCategory).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public deleteExistingAchievementCategory(id: number): Observable<any> {
        const url = `${this.achievementCategoryAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
