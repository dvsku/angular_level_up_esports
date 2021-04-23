export class TeamMember {
    id?: number;
    inGameName?: string;
    position?: string;
    nationality?: string;
    instagramLink?: string;
    twitterLink?: string;
    twitchLink?: string;

    constructor(
        id?: number,
        inGameName?: string,
        position?: string,
        nationality?: string,
        instagramLink?: string,
        twitterLink?: string,
        twitchLink?: string
    ) {
        this.id = id;
        this.inGameName = inGameName;
        this.position = position;
        this.nationality = nationality;
        this.instagramLink = instagramLink;
        this.twitterLink = twitterLink;
        this.twitchLink = twitchLink;
    }
}
