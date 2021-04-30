import { Achievement } from './Achievement';
import { TeamMember } from './TeamMember';

export class AchievementCategory {
    categoryId?: number;
    categoryName?: string;
    teamMembers?: TeamMember[];
    achievements?: Achievement[];

    constructor(categoryId?: number, categoryName?: string, teamMembers?: TeamMember[], achievements?: Achievement[]) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.teamMembers = teamMembers;
        this.achievements = achievements;
    }
}
