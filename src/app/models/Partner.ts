export class Partner {
    id?: number;
    name?: string;
    picture?: string;
    description?: string;
    partnerOrder?: number;

    constructor(name?: string, picture?: string, description?: string, order?: number) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.partnerOrder = order;
    }
}
