import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Achievement } from 'src/app/models/Achievement';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { Person } from 'src/app/models/Person';
import { AbstractAchievementEditorComponent } from 'src/app/parts/abstract/abstract-achievement-editor/abstract-achievement-editor.component';

@Component({
    selector: 'app-edit-achievement',
    templateUrl: '../add-achievement/add-achievement.component.html',
    styleUrls: ['../add-achievement/add-achievement.component.sass']
})
export class EditAchievementComponent
    extends AbstractAchievementEditorComponent
    implements OnInit, AfterViewInit, OnDestroy {
    title = 'EDIT ACHIEVEMENT';

    dateModel: NgbDateStruct;

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { team: AchievementCategory; achievement: Achievement }) => {
            if (!data.team || !data.achievement) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.team = data.team;
                this.name = this.teamService.getNameFromId(this.team.categoryId);
                this.achievement = JSON.parse(JSON.stringify(data.achievement));
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
        this.achievementService.updateAchievement(this.achievement).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: ['teams', this.name] } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Achievement updated.');
                        });
                } else {
                    this.toastrService.error('Failed to update achievement.');
                }
            },
            () => {
                this.toastrService.error('Failed to update achievement.');
            }
        );
    }
}
