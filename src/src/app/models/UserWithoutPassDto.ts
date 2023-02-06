import { UserRole } from '../enums/UserRole';

export class UserWithoutPassDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    streetAndNumber?: string;
    zip?: number;
    country?: string;
    userRole?: UserRole;

    constructor(
        email?: string,
        firstName?: string,
        lastName?: string,
        phone?: string,
        city?: string,
        streetAndNumber?: string,
        zip?: number,
        country?: string
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.city = city;
        this.streetAndNumber = streetAndNumber;
        this.zip = zip;
        this.country = country;
        this.userRole = UserRole.USER;
    }
}
