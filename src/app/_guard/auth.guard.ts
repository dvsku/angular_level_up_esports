import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
            if (currentUser.role === 'ADMIN') {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        }
        return false;
    }
}
