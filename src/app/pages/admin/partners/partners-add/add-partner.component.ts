import { Component } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-add-partner',
    templateUrl: './add-partner.component.html',
    styleUrls: ['./add-partner.component.sass']
})
export class AddPartnerComponent {
    partner: Partner = new Partner();
    title = 'Add Partner';

    constructor(
        private partnerService: PartnerService,
        private router: Router,
        private toastrService: ToastrService,
        public imagesService: ImagesService
    ) {}

    onSubmit(): void {
        this.partnerService.createPartner(this.partner).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'partners' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Partner added.');
                        });
                } else {
                    this.toastrService.error('Failed to add partner.');
                }
            },
            () => {
                this.toastrService.error('Failed to add partner.');
            }
        );
    }
}
