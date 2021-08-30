import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                switch (err.status) {
                    case 401:
                        this.userService.signOut();
                        return;
                    case 403:
                        this.userService.signOut();
                        this.router.navigate(['/']).then(() => {
                            this.toastrService.error('Session expired, please sign in again.');
                        });
                    default:
                        const error = err.error || err.statusText;
                        return throwError(error);
                }
            })
        );
    }
}
