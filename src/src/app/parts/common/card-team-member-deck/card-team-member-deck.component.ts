import { Component, Input } from '@angular/core';
import { TeamMember } from 'src/app/models/TeamMember';

@Component({
    selector: 'card-team-member-deck',
    templateUrl: './card-team-member-deck.component.html',
    styleUrls: ['./card-team-member-deck.component.sass']
})
export class CardTeamMemberDeckComponent {
    @Input()
    teamMembers: TeamMember[];
}
