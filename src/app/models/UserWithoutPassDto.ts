import { UserRole } from '../enums/UserRole';

export class UserWithoutPassDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    streetAndNumber?: string;
    zip?: number;
    userRole?: UserRole;

    constructor(
        email?: string,
        firstName?: string,
        lastName?: string,
        phone?: string,
        city?: string,
        streetAndNumber?: string,
        zip?: number
    ) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.city = city;
        this.streetAndNumber = streetAndNumber;
        this.zip = zip;
        this.userRole = UserRole.USER;
    }
}
