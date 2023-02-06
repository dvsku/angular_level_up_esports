import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public canLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public changeCanLoad(state: boolean) {
        this.canLoad.next(state);
    }

    public changeState(state: boolean) {
        if (this.canLoad.value) {
            this.isLoading.next(state);
        }
    }
}
