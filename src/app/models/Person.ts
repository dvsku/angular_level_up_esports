export class Person {
    id?: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;

    constructor(id?: number, firstName?: string, lastName?: string, profilePicture?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
    }
}
