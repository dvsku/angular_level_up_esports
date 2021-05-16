import { Person } from './Person';

export class TeamMember {
    id?: number;
    inGameName?: string;
    position?: string;
    instagramLink?: string;
    twitterLink?: string;
    twitchLink?: string;
    trovoLink: string;
    youtubeLink: string;
    facebookLink: string;
    person?: Person;
    displayOrder?: number;

    constructor(
        id?: number,
        inGameName?: string,
        position?: string,
        instagramLink?: string,
        twitterLink?: string,
        twitchLink?: string,
        trovoLink?: string,
        youtubeLink?: string,
        facebookLink?: string,
        person?: Person,
        displayOrder?: number
    ) {
        this.id = id;
        this.inGameName = inGameName;
        this.position = position;
        this.instagramLink = instagramLink;
        this.twitterLink = twitterLink;
        this.twitchLink = twitchLink;
        this.trovoLink = trovoLink;
        this.youtubeLink = youtubeLink;
        this.facebookLink = facebookLink;
        this.person = person;
        this.displayOrder = displayOrder;
    }
}
