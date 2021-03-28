import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TeamMember } from '../models/TeamMember';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private teamMemberUrl = `http://localhost:8080/api/teamMember`;
  private teamMemberAdminUrl = `http://localhost:8080/api/admin/teamMember`;

  constructor(private httpClient : HttpClient) { }

  public getOneTeamMember(id : number) : Observable<TeamMember>{
    const url = `${this.teamMemberUrl}/${id}`;
    return this.httpClient.get<TeamMember>(url).pipe(tap(data =>{
      // LOGOVANJE
    }));
  }

  public getAllTeamMembersInCategory(categoryNumber : number) : Observable<TeamMember[]>{
    const url = `${this.teamMemberUrl}/category/${categoryNumber}`;
    return this.httpClient.get<TeamMember[]>(url).pipe(tap(data => {
      // LOGOVANJE
    }));
  }

  public addNewTeamMemberInCategory(categoryNumber : number , teamMember : TeamMember) : Observable<TeamMember>{
    const url = `${this.teamMemberAdminUrl}/new/category/${categoryNumber}`;
    return this.httpClient.post<TeamMember>(url , teamMember).pipe(tap(data => {
      // LOGOVANJE
    }));
  }

  public editExistingTeamMember(id : number , teamMember : TeamMember) : Observable<TeamMember>{
    const url = `${this.teamMemberAdminUrl}/${id}/edit`;
    return this.httpClient.put<TeamMember>(url , teamMember).pipe(tap(data => {
      // LOGOVANJE
    }));
  }

  public deleteExistingTeamMember(id : number) : Observable<any>{
    const url = `${this.teamMemberAdminUrl}/${id}`;
    return this.httpClient.delete<TeamMember>(url).pipe(tap(data => {
      console.log(data);
    }));
  }
}
