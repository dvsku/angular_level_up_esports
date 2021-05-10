import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { TeamMembersHandler } from 'src/app/models/interfaces/TeamMembersHandler';
import { Person } from 'src/app/models/Person';
import { TeamMember } from 'src/app/models/TeamMember';
import { TeamMemberCreatorComponent } from 'src/app/parts/common/team-member-creator/team-member-creator.component';
import { AchievementCategoryService } from 'src/app/services/achievement-category.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-edit-roster-member',
    templateUrl: '../add-roster-member/add-roster-member.component.html',
    styleUrls: ['../add-roster-member/add-roster-member.component.sass']
})
export class EditRosterMemberComponent extends TeamMembersHandler implements OnInit, AfterViewInit, OnDestroy {
    private team: AchievementCategory;
    private name: string;

    public edit = true;
    public title = 'EDIT ROSTER MEMBER';

    public teamMember: TeamMember = new TeamMember();

    public people: Person[];
    public subtract: Person[];
    private peopleSubscription: Subscription;

    @ViewChild(TeamMemberCreatorComponent)
    teamMemberCreator: TeamMemberCreatorComponent;

    constructor(
        private teamService: AchievementCategoryService,
        private peopleService: PersonService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) {
        super();
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { team: AchievementCategory; member: TeamMember }) => {
            if (!data.team || !data.member) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.team = data.team;
                this.name = this.teamService.getNameFromId(this.team.categoryId);
                this.subtract = this.team.teamMembers.map<Person>((member) => member.person);
                this.teamMember = data.member;
            }
        });
        this.peopleSubscription = this.peopleService.getPeople().subscribe((people) => {
            this.people = people;
        });
    }

    ngAfterViewInit(): void {
        this.teamMemberCreator.parent = this;
    }

    ngOnDestroy(): void {
        if (this.peopleSubscription) this.peopleSubscription.unsubscribe();
    }

    updateTeamMember(teamMember: TeamMember): void {
        this.teamService.updateTeamMember(teamMember).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: ['teams', this.name] } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Roster member updated.');
                        });
                } else {
                    this.toastrService.error('Failed to update roster member.');
                }
            },
            () => {
                this.toastrService.error('Failed to update roster member.');
            }
        );
    }
}
