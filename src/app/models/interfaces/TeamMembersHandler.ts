/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { TeamMember } from '../TeamMember';

export abstract class TeamMembersHandler {
    createTeamMember(teamMember: TeamMember): void {}
    removeTeamMember(teamMember: TeamMember): void {}
    updateTeamMember(teamMember: TeamMember): void {}
    openEditWindow(teamMember: TeamMember): void {}
    changeOccured(): void {}
}
