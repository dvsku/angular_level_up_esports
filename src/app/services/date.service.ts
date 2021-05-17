import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    public convertFromISODate(dateString: string): string {
        const date = moment(dateString, 'YYYY-MM-DD');
        return date.format('DD/MM/YYYY');
    }

    public convertToISODate(dateString: string): string {
        const date = moment(dateString, 'DD/MM/YYYY');
        return date.format('YYYY-MM-DD');
    }

    public getDateTomorrow(): NgbDateStruct {
        const tomorrow = moment().add(1, 'days');
        return { year: tomorrow.year(), month: tomorrow.month() + 1, day: tomorrow.date() };
    }
}
