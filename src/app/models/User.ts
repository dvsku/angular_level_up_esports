import { UserRole } from "../enums/UserRole";

export class User{
  email : string;
  password : string;
  firstName : string;
  lastName : string;
  phone : string;
  city : string;
  streetAndNumber : string;
  userRole : UserRole;

  constructor() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.city = "";
    this.streetAndNumber = "";
    this.userRole = UserRole.USER;
  }
}
