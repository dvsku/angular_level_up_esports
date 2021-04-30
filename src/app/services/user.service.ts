import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { UserWithoutPassDto } from '../models/UserWithoutPassDto';
import { PasswordDto } from '../models/PasswordDto';
import { JwtResponse } from '../models/JwtResponse';

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
        const url = environment.apiURL + `auth/profile/${email}`;
        return this.httpClient
            .get<User>(url)
            .toPromise()
            .then(
                (user) => {
                    return user;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN IN / SIGN UP / SIGN OUT
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public signIn(model: any): Promise<boolean> {
        const url = environment.apiURL + `auth/login`;
        return this.httpClient
            .post<JwtResponse>(url, model)
            .toPromise()
            .then(
                (jwtResponse) => {
                    if (jwtResponse && jwtResponse.token) {
                        this.cookieService.set(
                            'currentUser',
                            JSON.stringify(jwtResponse),
                            undefined,
                            '/',
                            undefined,
                            false,
                            'Lax'
                        );
                        if (model.remembered) {
                            localStorage.setItem('currentUser', JSON.stringify(jwtResponse));
                        }
                        this.jwtUser = jwtResponse;
                        this.jwtUserSubject.next(this.jwtUser);
                    }
                    return true;
                },
                () => {
                    return false;
                }
            );
    }

    public signUp(newUser: User): Promise<boolean> {
        const url = environment.apiURL + `auth/register`;
        return this.httpClient
            .post<User>(url, newUser)
            .toPromise()
            .then(
                (user) => {
                    if (user) return true;
                    return false;
                },
                () => {
                    return false;
                }
            );
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
        const url = environment.apiURL + `auth/profile`;
        return this.httpClient
            .put<User>(url, existingUser)
            .toPromise()
            .then(
                (success) => {
                    return success;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public updatePassword(passwordDto: PasswordDto): Promise<boolean> {
        const url = environment.apiURL + `auth/profile/password-update`;
        return this.httpClient
            .put<boolean>(url, passwordDto)
            .toPromise()
            .then(
                (success) => {
                    return success;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  VERIFICATION
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public verify(token: string): Promise<number> {
        const url = environment.apiURL + `auth/register/confirm/${token}`;
        return this.httpClient
            .get<number>(url)
            .toPromise()
            .then(
                (status) => {
                    return status;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public resendVerificationToken(email: string): Promise<boolean> {
        const url = environment.apiURL + `auth/register/resendToken/${email}`;
        return this.httpClient
            .post<boolean>(url, null)
            .toPromise()
            .then(
                (status) => {
                    return status;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //  PASSWORD RESET
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public resetPassword(token: string, password: string): Promise<boolean> {
        const url = environment.apiURL + `auth/user/resetPassword/${token}`;
        return this.httpClient
            .put<boolean>(url, password)
            .toPromise()
            .then(
                (success) => {
                    return success;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    // 0 -> Valid
    // 1 -> Expired
    // 2 -> Doesn't exist
    public verifyPasswordResetToken(token: string): Promise<number> {
        const url = environment.apiURL + `auth/user/resetPassword/validate/${token}`;
        return this.httpClient
            .get<number>(url)
            .toPromise()
            .then(
                (status) => {
                    return status;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public sendPasswordTokenToEmail(email: string): Promise<boolean> {
        const url = environment.apiURL + `auth/user/resetPassword/${email}`;
        return this.httpClient
            .post<boolean>(url, null)
            .toPromise()
            .then(
                (success) => {
                    return success;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }
}
