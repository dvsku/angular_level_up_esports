import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AchievementPicture } from '../models/AchievementPicture';

@Injectable({
    providedIn: 'root'
})
export class AchievementPictureService {
    private pictureSubject: BehaviorSubject<AchievementPicture> = new BehaviorSubject<AchievementPicture>(
        new AchievementPicture()
    );
    private picturesSubject: BehaviorSubject<AchievementPicture[]> = new BehaviorSubject<AchievementPicture[]>([]);

    constructor(private httpClient: HttpClient) {}

    public getOneAchievementPicture(achievementPictureId: number): Observable<AchievementPicture> {
        return this.pictureSubject.asObservable();
    }

    public getAllAchievementPicturesForAchievement(achievementId: number): Observable<AchievementPicture[]> {
        return this.picturesSubject.asObservable();
    }

    public createAchievementPicture(achievementId: number, achievementPicture: AchievementPicture): Promise<boolean> {
        return Promise.resolve(true);
    }

    public addNewAchievementPicture(achievementId: number, achievementPicture: AchievementPicture): Promise<boolean> {
        return Promise.resolve(true);
    }

    public deleteAchievementPicture(achievementPictureId: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
