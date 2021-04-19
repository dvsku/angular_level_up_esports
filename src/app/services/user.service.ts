/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { JwtResponse } from '../response/JwtResponse';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();

    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
        const memo = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
        this.currentUser = this.currentUserSubject.asObservable();
        cookieService.set('currentUser', memo);
    }

    get currentUserValue(): JwtResponse {
        return this.currentUserSubject.value;
    }

    login(loginForm): Observable<JwtResponse> {
        const url = `http://localhost:8080/api/auth/login`;
        return this.httpClient.post<JwtResponse>(url, loginForm).pipe(
            tap((user) => {
                if (user && user.token) {
                    this.cookieService.set('currentUser', JSON.stringify(user));
                    if (loginForm.remembered) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    this.nameTerms.next(user.name);
                    this.currentUserSubject.next(user);
                    return user;
                }
            }),
            catchError(this.handleError('Login Failed', null))
        );
    }

    logout(): void {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.cookieService.delete('currentUser');
    }

    signup(newUser: User): Observable<User> {
        const url = `http://localhost:8080/api/auth/register`;
        return this.httpClient.post<User>(url, newUser);
    }

    update(existingUser: User): Observable<User> {
        const url = `http://localhost:8080/api/auth/profile`;
        return this.httpClient.put<User>(url, existingUser);
    }

    getUserProfile(email: string): Observable<User> {
        const url = `http://localhost:8080/api/auth/profile/${email}`;
        return this.httpClient.get<User>(url);
    }

    public resendConfirmationToken(email : string) : Observable<boolean>{
        const url = `http://localhost:8080/api/auth/register/resendToken/${email}`;
        return this.httpClient.post<boolean>(url , null).pipe(tap(data =>{
          console.log('Confirmation token was resend -> ' + data);
        }));
    }

    // 0 -> Valid
    // 1 -> Expired
    // 2 -> Doesn't exist
    public checkIfPasswordResetTokenIsValid(token : string) : Observable<number>{
        const url = `http://localhost:8080/api/auth/user/resetPassword/validate/${token}`;
        return this.httpClient.get<number>(url).pipe(tap(data =>{
          console.log('Is token valid -> ' + data);
        }));
    }

    public sendPasswordTokenToEmail(email : string) : Observable<boolean>{
      const url = `http://localhost:8080/api/auth/user/resetPassword/${email}`;
      return this.httpClient.post<boolean>(url , null).pipe(tap(data => {
        console.log('Password reset token sent to email -> ' + data);
      }));
    }

    public setNewPasswordForUser(token : string , email : string) : Observable<boolean>{
      const url = `http://localhost:8080/api/auth/user/resetPassword/${token}`;
      return this.httpClient.put<boolean>(url , email).pipe(tap(data => {
        console.log('Password updated for user -> ' + data);
      }));
    }

    // Handle Errors Method
    private handleError<T>(_operation: string, result?: T) {
        return (): Observable<T> => {
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
