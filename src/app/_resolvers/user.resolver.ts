import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../models/User';
import { JwtResponse } from '../response/JwtResponse';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService) {}

    resolve(): Promise<User> {
        const currentUser: JwtResponse = this.userService.getCurrentUser();
        if (currentUser === null || currentUser === undefined) {
            return undefined;
        }
        return this.userService.getUserProfile(currentUser.account).then(
            (user) => {
                return user;
            },
            () => {
                return undefined;
            }
        );
    }
}
