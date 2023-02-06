import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Partner } from '../models/Partner';
import { PartnerService } from '../services/partner.service';

@Injectable({
    providedIn: 'root'
})
export class PartnerResolver implements Resolve<Partner> {
    constructor(private partnerService: PartnerService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Partner> {
        const id = route.params['id'];
        return this.partnerService.getPartner(id).then(
            (partner) => {
                return partner;
            },
            () => {
                return undefined;
            }
        );
    }
}
