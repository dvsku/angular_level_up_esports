import { AchievementPicture } from './AchievementPicture';
import { TeamMember } from './TeamMember';

export class Achievement {
    id?: number;
    title: string;
    description: string;
    place: string;
    location: string;
    timeWhenFinished: string;
    pictures: AchievementPicture[] = [];
    teamMembers: TeamMember[] = [];

    public constructor(init?: Partial<Achievement>) {
        Object.assign(this, init);
    }
}
