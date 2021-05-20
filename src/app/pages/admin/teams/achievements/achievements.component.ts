import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowDown, faEdit, faPlus, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Achievement } from 'src/app/models/Achievement';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { ChangeDetection } from 'src/app/models/interfaces/ChangeDetection';
import { TeamMembersHandler } from 'src/app/models/interfaces/TeamMembersHandler';
import { TeamMember } from 'src/app/models/TeamMember';
import { TeamMemberGroupComponent } from 'src/app/parts/common/team-member-group/team-member-group.component';
import { AchievementCategoryService } from 'src/app/services/achievement-category.service';
import { AchievementService } from 'src/app/services/achievement.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    styleUrls: ['./achievements.component.sass']
})
export class AchievementsComponent extends TeamMembersHandler implements OnInit, AfterViewInit, ChangeDetection {
    public team: AchievementCategory;
    public name: string;

    @ViewChild(TeamMemberGroupComponent)
    teamMemberGroup: TeamMemberGroupComponent;

    faArrowDown = faArrowDown;
    faEdit = faEdit;
    faTimes = faTimes;
    faPlus = faPlus;
    faUserPlus = faUserPlus;

    selectedAchievement: Achievement;

    private hasChanges = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public imageService: ImagesService,
        private teamService: AchievementCategoryService,
        private toastrService: ToastrService,
        private achievementService: AchievementService
    ) {
        super();
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { team: AchievementCategory }) => {
            if (data.team === undefined || data.team === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.team = data.team;
                this.name = this.teamService.getNameFromId(this.team.categoryId);
            }
        });
    }

    ngAfterViewInit(): void {
        this.teamMemberGroup.parent = this;
    }

    removeTeamMember(teamMember: TeamMember): void {
        this.teamService.removeActiveRosterTeamMember(this.team.categoryId, teamMember.id).then(
            (success) => {
                if (success) {
                    const index = this.team.teamMembers.findIndex((x) => x.id === teamMember.id);
                    if (index !== -1) {
                        this.team.teamMembers.splice(index, 1);
                    }
                    this.hasChanges = true;
                    this.toastrService.success('Roster member removed.');
                } else {
                    this.toastrService.error('Failed to remove roster member.');
                }
            },
            () => {
                this.toastrService.error('Failed to remove roster member.');
            }
        );
    }

    openEditWindow(teamMember: TeamMember): void {
        this.router.navigate(
            [
                '/admin/dashboard',
                { outlets: { adminOutlet: ['teams', this.name, 'edit-roster-member', teamMember.id] } }
            ],
            { skipLocationChange: true }
        );
    }

    changeOccured(): void {
        this.hasChanges = true;
    }

    saveChanges(): Promise<boolean> {
        if (!this.hasChanges) return Promise.resolve(true);

        const promises = [];

        this.team.teamMembers.forEach((member) => {
            promises.push(this.teamService.updateTeamMember(member));
        });

        return Promise.all(promises).then(() => {
            return true;
        });
    }

    onRemoveAchievementOk() {
        this.achievementService.removeAchievement(this.selectedAchievement.id).then((success) => {
            if (success) {
                const index = this.team.achievements.findIndex((x) => x.id === this.selectedAchievement.id);
                if (index !== -1) {
                    this.team.achievements.splice(index, 1);
                }
                console.log(success);
            }
        });
    }
}
