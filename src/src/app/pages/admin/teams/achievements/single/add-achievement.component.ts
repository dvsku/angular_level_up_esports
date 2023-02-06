import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { Person } from 'src/app/models/Person';
import { AbstractAchievementEditorComponent } from 'src/app/parts/abstract/abstract-achievement-editor/abstract-achievement-editor.component';

@Component({
    selector: 'app-add-achievement',
    templateUrl: './achievement.template.html',
    styleUrls: ['./achievement.style.sass']
})
export class AddAchievementComponent
    extends AbstractAchievementEditorComponent
    implements OnInit, AfterViewInit, OnDestroy {
    title = 'ADD ACHIEVEMENT';

    dateModel: NgbDateStruct;

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { team: AchievementCategory }) => {
            if (data.team === undefined || data.team === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.team = data.team;
                this.name = this.teamService.getNameFromId(this.team.categoryId);
                this.subtract = this.achievement.teamMembers.map<Person>((member) => member.person);
            }
        });
        this.peopleSubscription = this.peopleService.getPeople().subscribe((people) => {
            this.people = people;
        });
    }

    ngAfterViewInit(): void {
        this.teamMemberGroup.parent = this;
    }

    ngOnDestroy(): void {
        if (this.peopleSubscription) this.peopleSubscription.unsubscribe();
    }

    onSubmit(): void {
        this.achievement.timeWhenFinished = this.parserFormatter.format(this.dateModel);
        this.achievementService.createAchievement(this.team.categoryId, this.achievement).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: ['teams', this.name] } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Achievement created.');
                        });
                } else {
                    this.toastrService.error('Failed to create achievement.');
                }
            },
            () => {
                this.toastrService.error('Failed to create achievement.');
            }
        );
    }
}
