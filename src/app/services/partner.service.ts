import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Partner } from '../models/Partner';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private partnerUrl = `http://localhost:8080/api/partner`;
    private adminPartnerUrl = `http://localhost:8080/api/admin/partner`;

    constructor(private httpClient: HttpClient) {}

    public getOnePartner(id: number): Observable<Partner> {
        const url = `${this.partnerUrl}/${id}`;
        return this.httpClient.get<Partner>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getAllPartners(): Observable<Partner[]> {
        const url = `${this.partnerUrl}/list`;
        return this.httpClient.get<Partner[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public addNewPartner(partner: Partner): Observable<boolean> {
        const url = `${this.adminPartnerUrl}/new`;
        return this.httpClient.post<boolean>(url, partner).pipe(
            tap((data) => {
                console.log('Added new partner -> ' + data);
            })
        );
    }

    public editExistingPartner(id: number, partner: Partner): Observable<boolean> {
        const url = `${this.adminPartnerUrl}/${id}/edit`;
        return this.httpClient.put<boolean>(url, partner).pipe(
            tap((data) => {
                console.log('Edited existing partner -> ' + data);
            })
        );
    }

    public deleteExistingPartner(id: number): Observable<any> {
        const url = `${this.adminPartnerUrl}/${id}`;
        return this.httpClient.delete<any>(url).pipe(
            tap((data) => {
                console.log(data);
            })
        );
    }
}
