import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { AchievementCategory } from '../models/AchievementCategory';
import { environment } from '../../environments/environment';
import { TeamMember } from '../models/TeamMember';
import { CompareService } from './compare.service';

@Injectable({
    providedIn: 'root'
})
export class AchievementCategoryService {
    private achievementCategoryUrl = environment.apiURL + `achievementCategory`;
    private achievementCategoryAdminUrl = environment.apiURL + `admin/achievementCategory`;
    private teamMemberUrl = environment.apiURL + 'team-member';
    private teamMemberAdminUrl = environment.apiURL + 'admin/team-member';

    private teams: AchievementCategory[] = null;
    private teamsSubject: BehaviorSubject<AchievementCategory[]> = new BehaviorSubject<AchievementCategory[]>(
        this.teams
    );
    private teamsObs = this.teamsSubject.asObservable();

    constructor(private httpClient: HttpClient, private compareService: CompareService) {}

    public getTeams(): Observable<AchievementCategory[]> {
        if (this.teams === null) {
            this.fetchTeams().subscribe((teams) => {
                this.teams = teams;
                this.teams.forEach((team) => {
                    team.teamMembers = team.teamMembers.sort((a, b) => a.displayOrder - b.displayOrder);
                    team.achievements = team.achievements.sort((a, b) =>
                        this.compareService.compareDatesDESC(a.timeWhenFinished, b.timeWhenFinished)
                    );
                });
                this.teamsSubject.next(this.teams);
                this.teamsObs.pipe(publishReplay(1), refCount());
            });
        }
        return this.teamsObs;
    }

    private fetchTeams(): Observable<AchievementCategory[]> {
        const url = `${this.achievementCategoryUrl}/list`;
        return this.httpClient.get<AchievementCategory[]>(url);
    }

    public getTeam(id: number): Promise<AchievementCategory> {
        let team = undefined;
        if (this.teams !== null && this.teams !== undefined) {
            team = this.teams.find((x) => x.categoryId === +id);
        }
        if (team === undefined) {
            return this.fetchTeam(id)
                .then((t) => {
                    t.teamMembers = t.teamMembers.sort((a, b) => a.displayOrder - b.displayOrder);
                    t.achievements = t.achievements.sort((a, b) =>
                        this.compareService.compareDatesDESC(a.timeWhenFinished, b.timeWhenFinished)
                    );
                    return t;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            console.log(1);
            team.teamMembers = team.teamMembers.sort((a, b) => a.displayOrder - b.displayOrder);
            team.achievements = team.achievements.sort((a, b) =>
                this.compareService.compareDatesDESC(a.timeWhenFinished, b.timeWhenFinished)
            );
            return Promise.resolve(team);
        }
    }

    private fetchTeam(id: number): Promise<AchievementCategory> {
        const url = `${this.achievementCategoryUrl}/${id}`;
        return this.httpClient
            .get<AchievementCategory>(url)
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

    public updateTeam(team: AchievementCategory): Promise<boolean> {
        return this.updateDatabaseTeam(team).then(
            (success) => {
                if (success) {
                    if (this.teamsObs) {
                        if (this.teams !== null && this.teams !== undefined) {
                            const index = this.teams.findIndex((x) => x.categoryId === team.categoryId);
                            if (index !== -1) {
                                this.teams[index] = team;
                                this.teamsSubject.next(this.teams);
                            }
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

    private updateDatabaseTeam(team: AchievementCategory): Promise<boolean> {
        const url = `${this.achievementCategoryAdminUrl}/${team.categoryId}/edit`;
        return this.httpClient
            .put<boolean>(url, team)
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

    public getIdFromName(name: string): number {
        switch (name) {
            case 'dota-2':
                return 1;
            case 'csgo':
                return 3;
            case 'league-of-legends':
                return 2;
            case 'warcraft-3':
                return 4;
            case 'fortnite':
                return 6;
            case 'heroes-of-the-storm':
                return 5;
            case 'hearthstone':
                return 7;
        }
    }

    public getNameFromId(id: number): string {
        switch (id) {
            case 1:
                return 'dota-2';
            case 3:
                return 'csgo';
            case 2:
                return 'league-of-legends';
            case 4:
                return 'warcraft-3';
            case 6:
                return 'fortnite';
            case 5:
                return 'heroes-of-the-storm';
            case 7:
                return 'hearthstone';
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // TEAM MEMBERS
    ////////////////////////////////////////////////////////////////////////////

    public getTeamMember(id: number): Promise<TeamMember> {
        return this.fetchTeamMember(id)
            .then((member) => {
                return member;
            })
            .catch(() => {
                return undefined;
            });
    }

    private fetchTeamMember(id: number): Promise<TeamMember> {
        const url = `${this.teamMemberUrl}/${id}`;
        return this.httpClient
            .get<TeamMember>(url)
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

    public createActiveRosterTeamMember(teamId: number, personId: number, teamMember: TeamMember): Promise<boolean> {
        return this.createDatabaseActiveRosterTeamMember(teamId, personId, teamMember).then(
            (memberId) => {
                if (memberId !== -1) {
                    if (this.teamsObs && this.teams) {
                        const index = this.teams.findIndex((x) => x.categoryId === teamId);
                        if (index !== -1) {
                            teamMember.id = memberId;
                            this.teams[index].teamMembers.push(teamMember);
                            this.teamsSubject.next(this.teams);
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            },
            () => {
                return false;
            }
        );
    }

    private createDatabaseActiveRosterTeamMember(
        teamId: number,
        personId: number,
        teamMember: TeamMember
    ): Promise<number> {
        const url = `${this.teamMemberAdminUrl}/add/categoryId/${teamId}/personId/${personId}`;
        return this.httpClient
            .post<number>(url, teamMember)
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

    public updateTeamMember(teamMember: TeamMember): Promise<boolean> {
        return this.updateDatabaseTeamMember(teamMember).then(
            (success) => {
                if (success) {
                    if (this.teamsObs && this.teams) {
                        const teamIndex = this.teams.findIndex((x) =>
                            x.teamMembers.findIndex((y) => y.id === teamMember.id)
                        );
                        if (teamIndex !== -1) {
                            const memberIndex = this.teams[teamIndex].teamMembers.findIndex(
                                (x) => x.id === teamMember.id
                            );
                            if (memberIndex !== -1) {
                                this.teams[teamIndex].teamMembers[memberIndex] = teamMember;
                                this.teamsSubject.next(this.teams);
                            }
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

    private updateDatabaseTeamMember(teamMember: TeamMember): Promise<boolean> {
        const url = `${this.teamMemberAdminUrl}/edit/${teamMember.id}`;
        return this.httpClient
            .put<boolean>(url, teamMember)
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

    public removeActiveRosterTeamMember(teamId: number, teamMemberId: number): Promise<boolean> {
        return this.removeDatabaseActiveRosterTeamMember(teamId, teamMemberId).then(
            (success) => {
                if (success) {
                    if (this.teamsObs && this.teams) {
                        const teamIndex = this.teams.findIndex((x) =>
                            x.teamMembers.findIndex((y) => y.id === teamMemberId)
                        );
                        if (teamIndex !== -1) {
                            const memberIndex = this.teams[teamIndex].teamMembers.findIndex(
                                (x) => x.id === teamMemberId
                            );
                            if (memberIndex !== -1) {
                                this.teams[teamIndex].teamMembers.splice(memberIndex, 1);
                                this.teamsSubject.next(this.teams);
                            }
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

    private removeDatabaseActiveRosterTeamMember(teamId: number, teamMemberId: number): Promise<boolean> {
        const url = `${this.teamMemberAdminUrl}/delete-from-category/categoryId/${teamId}/memberId/${teamMemberId}`;
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

    ////////////////////////////////////////////////////////////////////////////
    // NOT USED
    ////////////////////////////////////////////////////////////////////////////

    private addNewAchievementCategory(achievementCategory: AchievementCategory): Observable<boolean> {
        const url = `${this.achievementCategoryAdminUrl}/new`;
        return this.httpClient.post<boolean>(url, achievementCategory).pipe(
            tap((data) => {
                console.log('Added new achievement category -> ' + data);
            })
        );
    }

    private deleteExistingAchievementCategory(id: number): Observable<any> {
        const url = `${this.achievementCategoryAdminUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
