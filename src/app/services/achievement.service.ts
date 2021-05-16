import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Achievement } from '../models/Achievement';
import { environment } from '../../environments/environment';
import { TeamMember } from '../models/TeamMember';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {
    private achievementUrl = environment.apiURL + `achievement`;
    private achievementAdminUrl = environment.apiURL + `admin/achievement`;

    private teamMemberAdminUrl = environment.apiURL + 'admin/team-member';

    constructor(private httpClient: HttpClient) {}

    public getAchievement(achievementId: number): Promise<Achievement> {
        return this.fetchAchievement(achievementId).then(
            (achievement) => {
                return achievement;
            },
            () => {
                return undefined;
            }
        );
    }

    private fetchAchievement(achievementId: number): Promise<Achievement> {
        const url = `${this.achievementUrl}/${achievementId}`;
        return this.httpClient
            .get<Achievement>(url)
            .toPromise()
            .then(
                (achievement) => {
                    return achievement;
                },
                () => {
                    return undefined;
                }
            );
    }

    public createAchievement(teamId: number, achievement: Achievement): Promise<boolean> {
        return this.createDatabaseAchievement(teamId, achievement).then(
            (achievementId) => {
                return achievementId !== -1;
            },
            () => {
                return false;
            }
        );
    }

    public createDatabaseAchievement(teamId: number, achievement: Achievement): Promise<number> {
        const url = `${this.achievementAdminUrl}/new/category/${teamId}`;
        return this.httpClient
            .post<number>(url, achievement)
            .toPromise()
            .then(
                (achievementId) => {
                    return achievementId;
                },
                () => {
                    return -1;
                }
            );
    }

    public updateAchievement(achievement: Achievement): Promise<boolean> {
        return this.updateDatabaseAchievement(achievement).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    public updateDatabaseAchievement(achievement: Achievement): Promise<boolean> {
        const url = `${this.achievementAdminUrl}/${achievement.id}/edit`;
        return this.httpClient
            .put<boolean>(url, achievement)
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

    public removeAchievement(achievementId: number): Promise<boolean> {
        return this.removeDatabaseAchievement(achievementId).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    public removeDatabaseAchievement(achievementId: number): Promise<boolean> {
        const url = `${this.achievementAdminUrl}/${achievementId}`;
        return this.httpClient
            .delete<boolean>(url)
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

    public createAchievementTeamMember(
        achievementId: number,
        personId: number,
        teamMember: TeamMember
    ): Promise<boolean> {
        return this.addNewTeamMemberForAchievement(achievementId, personId, teamMember).then(
            (success) => {
                return success;
            },
            () => {
                return false;
            }
        );
    }

    public addNewTeamMemberForAchievement(
        achievementId: number,
        personId: number,
        teamMember: TeamMember
    ): Promise<boolean> {
        const url = `${this.teamMemberAdminUrl}/add/achievementId/${achievementId}/personId/${personId}`;
        return this.httpClient
            .post<boolean>(url, teamMember)
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

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //  NOT USED
    /////////////////////////////////////////////////////////////////////////////////////////////////

    private getAllAchievementsForCategory(categoryNumber: number): Observable<Achievement[]> {
        const url = `${this.achievementUrl}/category/${categoryNumber}`;
        return this.httpClient.get<Achievement[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }
}
