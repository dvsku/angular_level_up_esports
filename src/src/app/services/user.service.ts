import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { UserWithoutPassDto } from '../models/UserWithoutPassDto';
import { PasswordDto } from '../models/PasswordDto';
import { JwtResponse } from '../models/JwtResponse';
import { UserRole } from '../enums/UserRole';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private jwtUser: JwtResponse = null;
    private jwtUserSubject: BehaviorSubject<JwtResponse> = new BehaviorSubject<JwtResponse>(this.jwtUser);
    private jwtUserObs: Observable<JwtResponse> = this.jwtUserSubject.asObservable();

    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
        const memo = localStorage.getItem('currentUser');
        this.jwtUser = JSON.parse(memo);
        this.jwtUserSubject.next(this.jwtUser);
        cookieService.set('currentUser', memo, undefined, '/', undefined, false, 'Lax');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  GET/SET CURRENT USER
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public getCurrentUser(): JwtResponse {
        return this.jwtUser;
    }

    public getCurrentUserObservable(): Observable<JwtResponse> {
        return this.jwtUserObs;
    }

    public updateCurrentUserName(name: string): void {
        this.jwtUser.name = name;
        this.jwtUserSubject.next(this.jwtUser);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  GET/SET CURRENT USER
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public getUserProfile(email: string): Promise<User> {
        const user = new User();
        if (email === 'user@user.com') {
            user.email = 'user@user.com';
            user.password = 'secret';
            user.firstName = 'John';
            user.lastName = 'Smith';
            user.phone = '+38134343434';
            user.city = 'Novi Sad';
            user.streetAndNumber = 'Grčkoškolska 1';
            user.zip = 21000;
            user.country = 'Serbia';
            user.userRole = UserRole.USER;
        } else if (email === 'admin@admin.com') {
            user.email = 'admin@admin.com';
            user.password = 'secret';
            user.firstName = 'John';
            user.lastName = 'Smith';
            user.phone = '+38134343434';
            user.city = 'Novi Sad';
            user.streetAndNumber = 'Grčkoškolska 1';
            user.zip = 21000;
            user.country = 'Serbia';
            user.userRole = UserRole.ADMIN;
        } else {
            return Promise.reject();
        }
        return Promise.resolve(user);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN IN / SIGN UP / SIGN OUT
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public signIn(model: any): Promise<boolean> {
        let jwt: JwtResponse;

        if (model.username === 'user') {
            jwt = new JwtResponse();
            jwt.account = 'user@user.com';
            jwt.name = 'User';
            jwt.role = 'USER';
            jwt.token = 'abcdefg';
        } else if (model.username === 'admin') {
            jwt = new JwtResponse();
            jwt.account = 'admin@admin.com';
            jwt.name = 'Admin';
            jwt.role = 'ADMIN';
            jwt.token = 'abcdefg';
        } else {
            return Promise.resolve(false);
        }

        this.cookieService.set('currentUser', JSON.stringify(jwt), undefined, '/', undefined, false, 'Lax');
        if (model.remembered) {
            localStorage.setItem('currentUser', JSON.stringify(jwt));
        }
        this.jwtUser = jwt;
        this.jwtUserSubject.next(this.jwtUser);

        return Promise.resolve(true);
    }

    public signUp(newUser: User): Promise<boolean> {
        return Promise.resolve(true);
    }

    public signOut(): void {
        this.jwtUser = null;
        this.jwtUserSubject.next(this.jwtUser);
        localStorage.removeItem('currentUser');
        this.cookieService.delete('currentUser');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  UPDATES/RESETS
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public updateInformation(existingUser: UserWithoutPassDto): Promise<User> {
        const user = new User();
        if (existingUser.email === 'user@user.com' || existingUser.email === 'admin@admin.com') {
            user.email = existingUser.email;
            user.password = 'secret';
            user.firstName = existingUser.firstName;
            user.lastName = existingUser.lastName;
            user.phone = existingUser.phone;
            user.city = existingUser.city;
            user.streetAndNumber = existingUser.streetAndNumber;
            user.zip = existingUser.zip;
            user.country = existingUser.country;
            user.userRole = existingUser.userRole;
        } else {
            return Promise.reject();
        }
        return Promise.resolve(user);
    }

    public updatePassword(passwordDto: PasswordDto): Promise<boolean> {
        return Promise.resolve(true);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  VERIFICATION
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public verify(token: string): Promise<number> {
        return Promise.resolve(2);
    }

    public resendVerificationToken(email: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  PASSWORD RESET
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public resetPassword(token: string, password: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    // 0 -> Valid
    // 1 -> Expired
    // 2 -> Doesn't exist
    public verifyPasswordResetToken(token: string): Promise<number> {
        return Promise.resolve(0);
    }

    public sendPasswordTokenToEmail(email: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
