import { Person } from './Person';

export class TeamMember {
    id?: number;
    inGameName?: string;
    position?: string;
    nationality?: string;
    instagramLink?: string;
    twitterLink?: string;
    twitchLink?: string;
    person?: Person;
    displayOrder?: number;

    constructor(
        id?: number,
        inGameName?: string,
        position?: string,
        nationality?: string,
        instagramLink?: string,
        twitterLink?: string,
        twitchLink?: string,
        person?: Person,
        displayOrder?: number
    ) {
        this.id = id;
        this.inGameName = inGameName;
        this.position = position;
        this.nationality = nationality;
        this.instagramLink = instagramLink;
        this.twitterLink = twitterLink;
        this.twitchLink = twitchLink;
        this.person = person;
        this.displayOrder = displayOrder;
    }
}
