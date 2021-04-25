import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TeamMember } from '../models/TeamMember';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export default class TeamMemberService {
    private teamMemberUrl = environment.apiURL + 'team-member';
    private teamMemberAdminUrl = environment.apiURL + 'admin/team-member';

    constructor(private httpClient: HttpClient) {}

    public getOneTeamMember(id: number): Observable<TeamMember> {
        const url = `${this.teamMemberUrl}/${id}`;
        return this.httpClient.get<TeamMember>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllTeamMembersForAchievementCategory(achievementCategoryNumber: number): Observable<TeamMember[]> {
        const url = `${this.teamMemberUrl}/category/${achievementCategoryNumber}`;
        return this.httpClient.get<TeamMember[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllTeamMembersForAchievement(achievementId: number): Observable<TeamMember[]> {
        const url = `${this.teamMemberUrl}/achievement/${achievementId}`;
        return this.httpClient.get<TeamMember[]>(url).pipe(
            tap((data) => {
                // LOG
            })
        );
    }

    public addNewTeamMemberForAchievementCategory(
        achievementCategoryId: number,
        personId: number,
        teamMember: TeamMember
    ): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/add/categoryId/${achievementCategoryId}/personId/${personId}`;
        return this.httpClient.post<boolean>(url, teamMember).pipe(
            tap((data) => {
                console.log('Napravljen novi team member za current roster igrice -> ' + data);
            })
        );
    }

    public addNewTeamMemberForAchievement(
        achievementId: number,
        personId: number,
        teamMember: TeamMember
    ): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/add/achievementId/${achievementId}/personId/${personId}`;
        return this.httpClient.post<boolean>(url, teamMember).pipe(
            tap((data) => {
                console.log('Napravljen novi team member za current roster igrice -> ' + data);
            })
        );
    }

    public editExistingTeamMember(teamMemberId: number, teamMember: TeamMember): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/edit/${teamMemberId}`;
        return this.httpClient.put<boolean>(url, teamMember).pipe(
            tap((data) => {
                console.log('Updejtovan team member -> ' + data);
            })
        );
    }

    public deleteTeamMemberFromAchievement(achievementId: number, teamMemberId: number): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/delete-from-achievement/achievementId/${achievementId}/memberId/${teamMemberId}`;
        return this.httpClient.delete<boolean>(url).pipe(
            tap((data) => {
                console.log('Izbrisan team member iz achievementa -> ' + data);
            })
        );
    }

    public deleteTeamMemberFromAchievementCategory(
        achievementCategoryId: number,
        teamMemberId: number
    ): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/delete-from-category/categoryId/${achievementCategoryId}/memberId/${teamMemberId}`;
        return this.httpClient.delete<boolean>(url).pipe(
            tap((data) => {
                console.log('Izbrisan team member iz achievement kategorije -> ' + data);
            })
        );
    }
}
