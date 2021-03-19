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
  private adminAchievementUrl = `http://localhost:8080/api/admin/achievement`;

  constructor(private httpClient : HttpClient) {

  }

  public getAllAchievements() : Observable<Achievement[]> {
      const url = `${this.achievementUrl}/list`;
      return this.httpClient.get<Achievement[]>(url).pipe(tap(data =>{
      // logovanje
    }));
  }

  public getAchievementById(id : number) : Observable<Achievement>{
    const url = `${this.achievementUrl}/${id}`;
    return this.httpClient.get<Achievement>(url).pipe(tap(data =>{
      // logovanje
    }));
  }

  public getAllAchievementsByCategory(categoryType : number) : Observable<Achievement[]>{
    const url = `${this.achievementUrl}/list/${categoryType}`;
    return this.httpClient.get<Achievement[]>(url).pipe(tap(data =>{
       // logovanje
    }));
  }

  public addNewAchievement(achievement : Achievement) : Observable<Achievement>{
    const url = `${this.adminAchievementUrl}/new`;
    return this.httpClient.post<Achievement>(url , achievement).pipe(tap(data => {
       // logovanje
    }));
  }

  public editExistingAchievement(achievement : Achievement , achievementId : number) : Observable<Achievement>{
    const url = `${this.adminAchievementUrl}/${achievementId}/edit`;
    return this.httpClient.put<Achievement>(url , achievement).pipe(tap(data => {
       // logovanje
    }));
  }

  public deleteExistingAchievement(achievementId : number) : Observable<any>{
    const url = `${this.adminAchievementUrl}/${achievementId}`;
    return this.httpClient.delete<any>(url).pipe(tap(data => {
       // logovanje
    }));
  }
}
