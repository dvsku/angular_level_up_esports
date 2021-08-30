import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-edit-partner',
    templateUrl: './partner.template.html',
    styleUrls: ['./partner.style.sass']
})
export class EditPartnerComponent implements OnInit {
    partner: Partner = new Partner();
    title = 'Edit Partner';

    constructor(
        private partnerService: PartnerService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { partner: Partner }) => {
            if (data.partner === undefined || data.partner === null) {
                this.router.navigate(['/']);
                return;
            } else {
                this.partner = JSON.parse(JSON.stringify(data.partner));
            }
        });
    }

    onSubmit(): void {
        this.partnerService.updatePartner(this.partner).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'partners' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Partner updated.');
                        });
                } else {
                    this.toastrService.error('Failed to update partner.');
                }
            },
            () => {
                this.toastrService.error('Failed to update partner.');
            }
        );
    }
}
