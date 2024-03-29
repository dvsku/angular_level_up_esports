import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser.type} ${currentUser.token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
    }
}
