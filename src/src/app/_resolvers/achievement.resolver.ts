import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Achievement } from '../models/Achievement';
import { AchievementService } from '../services/achievement.service';

@Injectable({
    providedIn: 'root'
})
export class AchievementResolver implements Resolve<Achievement> {
    constructor(private achievementService: AchievementService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Achievement> {
        const id = +route.params['id'];
        return this.achievementService.getAchievement(id).then(
            (achievement) => {
                return achievement;
            },
            () => {
                return undefined;
            }
        );
    }
}
