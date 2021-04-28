import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { faAngleDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.sass']
})
export class AdminPartnersComponent implements OnInit, OnDestroy {
    partners: Partner[];
    selectedPartner: Partner;
    private partnersSubscription: Subscription;

    faArrowDown = faAngleDown;
    faInfo = faInfo;

    constructor(
        private partnerService: PartnerService,
        private toastrService: ToastrService,
        private modalService: NgbModal,
        public imagesService: ImagesService
    ) {}

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

    drop(event): void {
        moveItemInArray(this.partners, event.previousIndex, event.currentIndex);
        this.reorderPartners();
    }

    reorderPartners(): void {
        this.partners.forEach((partner, index) => {
            partner.displayOrder = index + 1;
        });
    }

    showModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onRemoveOk(): void {
        if (this.selectedPartner !== undefined && this.selectedPartner !== null) {
            this.partnerService.removePartner(this.selectedPartner.id).then(
                (success) => {
                    if (success) {
                        this.toastrService.success('Partner removed.');
                    } else {
                        this.toastrService.error('Failed to remove partner.');
                    }
                },
                () => {
                    this.toastrService.error('Failed to remove partner.');
                }
            );
        }
    }

    saveChanges(): void {
        for (const partner of this.partners) {
            this.partnerService.updatePartner(partner).then(
                (success) => {
                    if (success) {
                        this.toastrService.success('Partners updated.');
                    } else {
                        this.toastrService.error('Failed to update partners.');
                    }
                },
                () => {
                    this.toastrService.error('Failed to update partners.');
                }
            );
        }
    }
}
