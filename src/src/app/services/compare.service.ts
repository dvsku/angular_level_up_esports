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

    public compareISODatesASC(dateA: string, dateB: string) {
        const dayA = moment(dateA, 'YYYY-MM-DD HH:MM:SS');
        const dayB = moment(dateB, 'YYYY-MM-DD HH:MM:SS');
        return dayA.isBefore(dayB) ? -1 : 1;
    }

    public compareISODatesDESC(dateA: string, dateB: string) {
        const dayA = moment(dateA, 'DD/MM/YYYY HH:MM:SS');
        const dayB = moment(dateB, 'DD/MM/YYYY HH:MM:SS');
        return dayA.isBefore(dayB) ? 1 : -1;
    }

    public compareNumbersASC(numA: number, numB: number) {
        return 0 - (numA > numB ? -1 : 1);
    }

    public compareNumbersDESC(numA: number, numB: number) {
        return 0 - (numA > numB ? 1 : -1);
    }
}
