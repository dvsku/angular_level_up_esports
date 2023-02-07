import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Achievement } from '../models/Achievement';
import { environment } from '../../environments/environment';
import { TeamMember } from '../models/TeamMember';
import { AchievementPicture } from '../models/AchievementPicture';
import { Person } from '../models/Person';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {
    private achievementUrl = environment.apiURL + `achievement`;
    private achievementAdminUrl = environment.apiURL + `admin/achievement`;

    private teamMemberAdminUrl = environment.apiURL + 'admin/team-member';

    constructor(private httpClient: HttpClient) {}

    public getAchievement(achievementId: number): Promise<Achievement> {
        return Promise.resolve(
            new Achievement({
                title: 'The International',
                description: '',
                place: '1st',
                location: 'Berlin, Germany',
                timeWhenFinished: '21/05/2021',
                pictures: [
                    new AchievementPicture(1, 'achievements/achievements_1.jpg'),
                    new AchievementPicture(2, 'achievements/achievements_2.jpg')
                ],
                teamMembers: [
                    new TeamMember(
                        1,
                        'Panj',
                        'Support',
                        '',
                        '',
                        'https://www.twitch.tv/',
                        '',
                        'https://www.youtube.com/',
                        '',
                        new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')
                    )
                ]
            })
        );
    }

    public createAchievement(teamId: number, achievement: Achievement): Promise<boolean> {
        return Promise.resolve(true);
    }

    public updateAchievement(achievement: Achievement): Promise<boolean> {
        return Promise.resolve(true);
    }

    public removeAchievement(achievementId: number): Promise<boolean> {
        return Promise.resolve(true);
    }

    public createAchievementTeamMember(
        achievementId: number,
        personId: number,
        teamMember: TeamMember
    ): Promise<boolean> {
        return Promise.resolve(true);
    }
}
