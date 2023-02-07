import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { AchievementCategory } from '../models/AchievementCategory';
import { environment } from '../../environments/environment';
import { TeamMember } from '../models/TeamMember';
import { CompareService } from './compare.service';
import { Achievement } from '../models/Achievement';
import { Person } from '../models/Person';
import { AchievementPicture } from '../models/AchievementPicture';

@Injectable({
    providedIn: 'root'
})
export class AchievementCategoryService {
    private teams: AchievementCategory[] = [
        new AchievementCategory(
            1,
            'DOTA 2',
            [
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
            ],
            [
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
                }),
                new Achievement({
                    title: 'The International',
                    description: '',
                    place: '3rd',
                    location: 'Berlin, Germany',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            2,
            'LEAGUE OF LEGENDS',
            [
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
            ],
            [
                new Achievement({
                    title: 'EBL',
                    description: '',
                    place: '1st',
                    location: 'Belgrade, Serbia',
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
                }),
                new Achievement({
                    title: 'EBL',
                    description: '',
                    place: '2nd',
                    location: 'Belgrade, Serbia',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            3,
            'COUNTER-STRIKE: GLOBAL OFFENSIVE',
            [
                new TeamMember(
                    1,
                    'Panj',
                    'IGL',
                    '',
                    '',
                    'https://www.twitch.tv/',
                    '',
                    'https://www.youtube.com/',
                    '',
                    new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')
                )
            ],
            [
                new Achievement({
                    title: 'Major',
                    description: '',
                    place: '1st',
                    location: 'Boston, USA',
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
                }),
                new Achievement({
                    title: 'Major',
                    description: '',
                    place: '2nd',
                    location: 'Boston, USA',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            4,
            'WARCRAFT III',
            [
                new TeamMember(
                    1,
                    'Panj',
                    '',
                    '',
                    '',
                    'https://www.twitch.tv/',
                    '',
                    'https://www.youtube.com/',
                    '',
                    new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')
                )
            ],
            [
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '1st',
                    location: 'London, UK',
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
                }),
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '2nd',
                    location: 'London, UK',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            5,
            'HEROES OF THE STORM',
            [
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
            ],
            [
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '1st',
                    location: 'London, UK',
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
                }),
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '2nd',
                    location: 'London, UK',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            6,
            'FORTNITE',
            [
                new TeamMember(
                    1,
                    'Panj',
                    '',
                    '',
                    '',
                    'https://www.twitch.tv/',
                    '',
                    'https://www.youtube.com/',
                    '',
                    new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')
                )
            ],
            [
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '1st',
                    location: 'London, UK',
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
                }),
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '2nd',
                    location: 'London, UK',
                    timeWhenFinished: '21/05/2020',
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
            ]
        ),
        new AchievementCategory(
            7,
            'HEARTHSTONE',
            [
                new TeamMember(
                    1,
                    'Panj',
                    '',
                    '',
                    '',
                    'https://www.twitch.tv/',
                    '',
                    'https://www.youtube.com/',
                    '',
                    new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')
                )
            ],
            [
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '1st',
                    location: 'London, UK',
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
                }),
                new Achievement({
                    title: 'Minor tournament',
                    description: '',
                    place: '2nd',
                    location: 'London, UK',
                    timeWhenFinished: '21/05/2020',
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
            ]
        )
    ];
    private teamsSubject: BehaviorSubject<AchievementCategory[]> = new BehaviorSubject<AchievementCategory[]>(
        this.teams
    );
    private teamsObs = this.teamsSubject.asObservable();

    constructor(private httpClient: HttpClient, private compareService: CompareService) {}

    public getTeams(): Observable<AchievementCategory[]> {
        return this.teamsObs;
    }

    public getTeam(id: number): Promise<AchievementCategory> {
        let team = undefined;
        if (this.teams !== null && this.teams !== undefined) {
            team = this.teams.find((x) => x.categoryId === +id);
        }
        if (team === undefined) {
            return Promise.reject();
        } else {
            team.teamMembers = team.teamMembers.sort((a, b) => a.displayOrder - b.displayOrder);
            team.achievements = team.achievements.sort((a, b) =>
                this.compareService.compareDatesDESC(a.timeWhenFinished, b.timeWhenFinished)
            );
            return Promise.resolve(team);
        }
    }

    public updateTeam(team: AchievementCategory): Promise<boolean> {
        return Promise.resolve(true);
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
        return Promise.resolve(
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
        );
    }

    public createActiveRosterTeamMember(teamId: number, personId: number, teamMember: TeamMember): Promise<boolean> {
        return Promise.resolve(true);
    }

    public updateTeamMember(teamMember: TeamMember): Promise<boolean> {
        return Promise.resolve(true);
    }

    public removeActiveRosterTeamMember(teamId: number, teamMemberId: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
