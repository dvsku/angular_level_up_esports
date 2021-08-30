import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/Partner';
import { ImagesService } from 'src/app/services/images.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.sass']
})
export class PartnersComponent implements OnInit, OnDestroy {
    partners: Partner[];
    private partnersSubscription: Subscription;

    constructor(private partnerService: PartnerService, public imagesService: ImagesService) {}

    ngOnInit(): void {
        this.partnersSubscription = this.partnerService.getPartners().subscribe((partners) => {
            this.partners = partners;
        });
    }

    ngOnDestroy(): void {
        if (this.partnersSubscription !== null && this.partnersSubscription !== undefined) {
            this.partnersSubscription.unsubscribe();
        }
    }
}
