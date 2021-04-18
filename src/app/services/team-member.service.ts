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
    private teamMemberUrl = environment.apiURL + 'teamMember';
    private teamMemberAdminUrl = environment.apiURL + 'admin/teamMember';

    constructor(private httpClient: HttpClient) {}

    public getOneTeamMember(id: number): Observable<TeamMember> {
        const url = `${this.teamMemberUrl}/${id}`;
        return this.httpClient.get<TeamMember>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllTeamMembersInCategory(categoryNumber: number): Observable<TeamMember[]> {
        const url = `${this.teamMemberUrl}/category/${categoryNumber}`;
        return this.httpClient.get<TeamMember[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public addNewTeamMemberInCategory(categoryNumber: number, teamMember: TeamMember): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/new/category/${categoryNumber}`;
        return this.httpClient.post<boolean>(url, teamMember).pipe(
            tap((data) => {
                console.log('Added new team member -> ' + data);
            })
        );
    }

    public editExistingTeamMember(id: number, teamMember: TeamMember): Observable<boolean> {
        const url = `${this.teamMemberAdminUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, teamMember).pipe(
            tap((data) => {
                console.log('Edited existing team member -> ' + data);
            })
        );
    }

    public deleteExistingTeamMember(id: number): Observable<any> {
        const url = `${this.teamMemberAdminUrl}/${id}`;
        return this.httpClient.delete<TeamMember>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
