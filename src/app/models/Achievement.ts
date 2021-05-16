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

    constructor(title?: string, description?: string, place?: string, location?: string, timeWhenFinished?: string) {
        this.title = title;
        this.description = description;
        this.place = place;
        this.location = location;
        this.timeWhenFinished = timeWhenFinished;
    }
}
