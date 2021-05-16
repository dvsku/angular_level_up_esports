import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class CompareService {
    public compareDatesASC(dateA: string, dateB: string) {
        const dayA = moment(dateA, 'DD/MM/YYYY');
        const dayB = moment(dateB, 'DD/MM/YYYY');
        return dayA.isBefore(dayB) ? -1 : 1;
    }

    public compareDatesDESC(dateA: string, dateB: string) {
        const dayA = moment(dateA, 'DD/MM/YYYY');
        const dayB = moment(dateB, 'DD/MM/YYYY');
        return dayA.isBefore(dayB) ? 1 : -1;
    }
}
