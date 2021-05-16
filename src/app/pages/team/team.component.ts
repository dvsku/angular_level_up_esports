/* eslint-disable angular/timeout-service */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { AchievementCategoryService } from 'src/app/services/achievement-category.service';
import { ImagesService } from 'src/app/services/images.service';
import { faAngleDown, faMedal, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Achievement } from 'src/app/models/Achievement';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
    public team: AchievementCategory;
    public name: string;

    faArrowDown = faAngleDown;
    faTrophy = faTrophy;

    selectedAchievement: Achievement;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public imageService: ImagesService,
        private teamService: AchievementCategoryService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { team: AchievementCategory }) => {
            if (data.team === undefined || data.team === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.loaderService.changeState(true);
                this.team = data.team;
                this.name = this.teamService.getNameFromId(this.team.categoryId);
                this.selectedAchievement = undefined;
                setTimeout(() => {
                    this.loaderService.changeState(false);
                }, 2000);
            }
        });
    }

    shouldShowMedal(achievement: Achievement): boolean {
        return (
            achievement.place.toLowerCase() === '1st' ||
            achievement.place.toLowerCase() === '2nd' ||
            achievement.place.toLowerCase() === '3rd'
        );
    }

    getMedalColor(achievement: Achievement) {
        switch (achievement.place.toLowerCase()) {
            case '1st':
                return '#FFD700';
            case '2nd':
                return '#C0C0C0';
            case '3rd':
                return '#CD7F32';
        }
    }
}
