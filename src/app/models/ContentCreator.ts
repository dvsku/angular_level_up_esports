export class ContentCreator {
    id?: number;
    firstName: string;
    lastName: string;
    nickName: string;
    description: string;
    profilePicture: string;
    twitchLink: string;
    trovoLink: string;
    youtubeLink: string;
    facebookLink: string;
    instagramLink: string;

    constructor(
        id?: number,
        firstName?: string,
        lastName?: string,
        nickName?: string,
        description?: string,
        profilePicture?: string,
        twitchLink?: string,
        trovoLink?: string,
        youtubeLink?: string,
        facebookLink?: string,
        instagramLink?: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = nickName;
        this.description = description;
        this.profilePicture = profilePicture;
        this.twitchLink = twitchLink;
        this.trovoLink = trovoLink;
        this.youtubeLink = youtubeLink;
        this.facebookLink = facebookLink;
        this.instagramLink = instagramLink;
    }
}
