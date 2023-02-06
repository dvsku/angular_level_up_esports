import { Component, Input } from '@angular/core';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { TeamMembersHandler } from 'src/app/models/interfaces/TeamMembersHandler';
import { Person } from 'src/app/models/Person';
import { TeamMember } from 'src/app/models/TeamMember';

@Component({
    selector: 'team-member-creator',
    templateUrl: './team-member-creator.component.html',
    styleUrls: ['./team-member-creator.component.sass']
})
export class TeamMemberCreatorComponent {
    @Input()
    teamMember: TeamMember;

    @Input()
    people: Person[];

    @Input()
    subtract: Person[];

    @Input()
    edit = false;

    @Input()
    parent: TeamMembersHandler;

    faUserPlus = faUserPlus;
    faUserMinus = faUserMinus;

    unlinkPerson(): void {
        const index = this.subtract.findIndex((x) => x.id === this.teamMember.person.id);
        if (index !== -1) {
            this.subtract.splice(index, 1);
        }
        this.teamMember.person = null;
    }

    public onSubmit() {
        if (this.edit) this.parent.updateTeamMember(this.teamMember);
        else this.parent.createTeamMember(this.teamMember);
    }
}
