import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Partner } from '../models/Partner';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private partnerUrl = environment.apiURL + `partner`;
    private adminPartnerUrl = environment.apiURL + `admin/partner`;

    private partners: Partner[] = [
        new Partner(1, 'SoccerBet', 'partners/partner_1.png', '', 0, 'https://soccerbet.rs/'),
        new Partner(
            2,
            'Gizmo',
            'partners/partner_2.png',
            'Take control and manage your products according to your specific business requirements. Whether it’s a simple or time-based sale, your product and product bundles are fully supported with our easy-to- use software.',
            1,
            'https://www.gizmopowered.net/'
        ),
        new Partner(
            3,
            'White Shark',
            'partners/partner_3.png',
            'White Shark was made for those who have a deep passion for gaming but lack the budget for expensive gaming equipment.',
            1,
            'https://whiteshark.gg/'
        )
    ];
    private partnersSubject: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>(this.partners);
    private partnersObs: Observable<Partner[]> = this.partnersSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getPartners(): Observable<Partner[]> {
        return this.partnersObs;
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
