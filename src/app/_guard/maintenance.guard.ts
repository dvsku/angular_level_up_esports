import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaintenanceService } from '../services/maintenance.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
    constructor(
        private router: Router,
        private maintenanceService: MaintenanceService,
        private userService: UserService
    ) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const currentUser = this.userService.currentUserValue;
        if (currentUser !== null && currentUser !== undefined) {
            if (currentUser.role === 'ADMIN') {
                return true;
            }
        }
        if (!this.maintenanceService.isMaintenance) {
            return true;
        }
        this.router.navigate(['/maintenance']);
        return false;
    }
}
