import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartNotifyService {
    subject: ReplaySubject<any> = new ReplaySubject();
    obs: Observable<any> = this.subject.asObservable();

    notify = (data: boolean): void => {
        this.subject.next(data);
    };
}
