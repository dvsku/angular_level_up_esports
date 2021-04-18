import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount, tap } from 'rxjs/operators';
import { Partner } from '../models/Partner';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private partnerUrl = environment.apiURL + `partner`;
    private adminPartnerUrl = environment.apiURL + `admin/partner`;

    private partners: Partner[] = null;
    private partnersSubject: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>(this.partners);
    private partnersObs: Observable<Partner[]> = this.partnersSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getPartners(): Observable<Partner[]> {
        if (this.partners === null) {
            this.fetchPartners().subscribe((products) => {
                this.partners = products;
                this.partners.sort((a, b) => a.displayOrder - b.displayOrder);
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

    public createPartner(partner: Partner): Promise<boolean> {
        return this.createDatabasePartner(partner)
            .then((partnerId) => {
                if (partnerId !== -1) {
                    if (this.partners !== null && this.partners !== undefined) {
                        partner.id = partnerId;
                        this.partners.push(partner);
                        this.partners.sort((a, b) => a.displayOrder - b.displayOrder);
                        this.partnersSubject.next(this.partners);
                    }
                    return true;
                } else {
                    return false;
                }
            })
            .catch(() => {
                return false;
            });
    }

    private createDatabasePartner(partner: Partner): Promise<number> {
        const url = `${this.adminPartnerUrl}/new`;
        return this.httpClient
            .post<number>(url, partner)
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

    public updatePartner(partner: Partner): Promise<boolean> {
        return this.updateDatabasePartner(partner.id, partner)
            .then((success) => {
                if (success) {
                    if (this.partners !== null && this.partners !== undefined) {
                        const index = this.partners.findIndex((x) => x.id === partner.id);
                        if (index !== -1) {
                            this.partners[index] = partner;
                            this.partners.sort((a, b) => a.displayOrder - b.displayOrder);
                            this.partnersSubject.next(this.partners);
                        }
                    }
                }
                return success;
            })
            .catch(() => {
                return false;
            });
    }

    private updateDatabasePartner(id: number, partner: Partner): Promise<boolean> {
        const url = `${this.adminPartnerUrl}/${id}/edit`;
        return this.httpClient
            .put<boolean>(url, partner)
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

    public removePartner(partnerId: number): Promise<boolean> {
        return this.removeDatabasePartner(partnerId)
            .then((success) => {
                if (success) {
                    if (this.partners !== null && this.partners !== undefined) {
                        const index = this.partners.findIndex((x) => x.id === partnerId);
                        if (index !== -1) {
                            this.partners.splice(index, 1);
                            this.partners.sort((a, b) => a.displayOrder - b.displayOrder);
                            this.partnersSubject.next(this.partners);
                        }
                    }
                }
                return success;
            })
            .catch(() => {
                return false;
            });
    }

    private removeDatabasePartner(id: number): Promise<any> {
        const url = `${this.adminPartnerUrl}/${id}`;
        return this.httpClient
            .delete<any>(url)
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
}
