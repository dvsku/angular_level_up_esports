import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeDetection } from '../models/interfaces/ChangeDetection';

@Injectable({
    providedIn: 'root'
})
export class HasChangesGuard implements CanDeactivate<ChangeDetection> {
    canDeactivate(
        component: ChangeDetection
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.saveChanges();
    }
}
