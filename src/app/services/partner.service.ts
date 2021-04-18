import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { Partner } from '../models/Partner';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private partnerUrl = `http://localhost:8080/api/partner`;
    private adminPartnerUrl = `http://localhost:8080/api/admin/partner`;

    private partners: Partner[] = null;
    private partnersSubject: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>(this.partners);
    private partnersObs: Observable<Partner[]> = this.partnersSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getPartners(): Observable<Partner[]> {
        if (this.partners === null) {
            this.fetchPartners().subscribe((products) => {
                this.partners = products;
                this.partners.sort((a, b) => a.partnerOrder - b.partnerOrder);
                this.partnersSubject.next(this.partners);
                this.partnersObs.pipe(publishReplay(1), refCount());
                console.log('Fetched partners from server.');
            });
        }
        return this.partnersObs;
    }

    private fetchPartners(): Observable<Partner[]> {
        const url = `${this.partnerUrl}/list`;
        return this.httpClient.get<Partner[]>(url).pipe(
            tap(() => {
                // LOGOVANJE
            })
        );
    }

    public getPartner(partnerId: number): Promise<Partner> {
        let partner = undefined;
        if (this.partners !== null && this.partners !== undefined) {
            partner = this.partners.find((x) => x.id === +partnerId);
        }
        if (partner === undefined) {
            return this.fetchPartner(partnerId)
                .then((part) => {
                    return part;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            return Promise.resolve(partner);
        }
    }

    private fetchPartner(partnerId: number): Promise<Partner> {
        const url = `${this.partnerUrl}/${partnerId}`;
        return this.httpClient
            .get<Partner>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
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
