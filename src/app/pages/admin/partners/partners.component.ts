import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.sass']
})
export class AdminPartnersComponent implements OnInit, OnDestroy {
    partners: Partner[];
    private partnersSubscription: Subscription;

    constructor(private partnerService: PartnerService) {}

    ngOnInit(): void {
        this.partnersSubscription = this.partnerService.getPartners().subscribe((partners) => {
            this.partners = partners;
            console.log(this.partners);
        });
    }

    ngOnDestroy(): void {
        if (this.partnersSubscription !== null && this.partnersSubscription !== undefined) {
            this.partnersSubscription.unsubscribe();
        }
    }

    onSubmit() {}
}
