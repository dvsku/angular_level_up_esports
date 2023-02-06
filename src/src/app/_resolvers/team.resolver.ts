import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AchievementCategory } from '../models/AchievementCategory';
import { AchievementCategoryService } from '../services/achievement-category.service';

@Injectable({
    providedIn: 'root'
})
export class TeamResolver implements Resolve<AchievementCategory> {
    constructor(private teamSearvice: AchievementCategoryService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<AchievementCategory> {
        const name: string = route.params['name'];
        const id = this.teamSearvice.getIdFromName(name);
        return this.teamSearvice.getTeam(id).then(
            (team) => {
                return team;
            },
            () => {
                return undefined;
            }
        );
    }
}
