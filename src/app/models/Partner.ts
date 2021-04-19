export class Partner {
    id?: number;
    name?: string;
    picture?: string;
    description?: string;
    partnerOrder?: number;
    linkToWebsite? : string;

    constructor(name?: string, picture?: string, description?: string, order?: number , linkToWebsite?: string) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.partnerOrder = order;
        this.linkToWebsite = linkToWebsite;
    }
}
