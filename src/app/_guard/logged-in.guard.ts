import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser !== null && currentUser !== undefined) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
