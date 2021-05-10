import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AchievementCategory } from 'src/app/models/AchievementCategory';
import { Person } from 'src/app/models/Person';
import { AbstractAchievementEditorComponent } from 'src/app/parts/abstract/abstract-achievement-editor/abstract-achievement-editor.component';

@Component({
    selector: 'app-add-achievement',
    templateUrl: './add-achievement.component.html',
    styleUrls: ['./add-achievement.component.sass']
})
export class AddAchievementComponent
    extends AbstractAchievementEditorComponent
    implements OnInit, AfterViewInit, OnDestroy {
    title = 'ADD ACHIEVEMENT';

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
        this.achievementService.createAchievement(this.team.categoryId, this.achievement).then((achievementId) => {
            if (achievementId !== -1) {
                console.log('success');
            }
            console.log('fail');
        });
    }
}
