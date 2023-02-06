import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TeamMembersHandler } from 'src/app/models/interfaces/TeamMembersHandler';
import { TeamMember } from 'src/app/models/TeamMember';

@Component({
    selector: 'team-member-group',
    templateUrl: './team-member-group.component.html',
    styleUrls: ['./team-member-group.component.sass']
})
export class TeamMemberGroupComponent {
    @Input()
    teamMembers: TeamMember[];

    @Output()
    teamMembersChange = new EventEmitter<TeamMember[]>();

    @ViewChild('removeMemberModal')
    modal: ElementRef;

    faEdit = faEdit;
    faTimes = faTimes;

    parent: TeamMembersHandler;

    selectedTeamMember: TeamMember;

    public openEditWindow(teamMember: TeamMember): void {
        this.parent.openEditWindow(teamMember);
    }

    public onRemoveMemberOk(): void {
        this.parent.removeTeamMember(this.selectedTeamMember);
    }

    reorderTeamMembers(): void {
        this.teamMembers.forEach((member, index) => {
            member.displayOrder = index + 1;
        });
    }

    public dropMembers(event: any): void {
        moveItemInArray(this.teamMembers, event.previousIndex, event.currentIndex);
        this.reorderTeamMembers();
        this.teamMembersChange.emit(this.teamMembers);
        this.parent.changeOccured();
    }
}
