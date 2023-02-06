import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TeamMember } from '../models/TeamMember';
import { AchievementCategoryService } from '../services/achievement-category.service';

@Injectable({
    providedIn: 'root'
})
export class TeamMemberResolver implements Resolve<TeamMember> {
    constructor(private teamSearvice: AchievementCategoryService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<TeamMember> {
        const id = +route.params['id'];
        return this.teamSearvice.getTeamMember(id).then(
            (member) => {
                return member;
            },
            () => {
                return undefined;
            }
        );
    }
}
