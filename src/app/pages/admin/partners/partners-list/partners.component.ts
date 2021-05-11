import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { faAngleDown, faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from 'src/app/services/images.service';
import { ChangeDetection } from 'src/app/models/interfaces/ChangeDetection';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.sass']
})
export class AdminPartnersComponent implements OnInit, OnDestroy, ChangeDetection {
    partners: Partner[];
    selectedPartner: Partner;
    private partnersSubscription: Subscription;

    faArrowDown = faAngleDown;
    faPlus = faPlus;
    faEdit = faEdit;
    faTimes = faTimes;

    private hasChanges = false;

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
        this.hasChanges = true;
    }

    showModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onRemoveOk(): void {
        if (this.selectedPartner !== undefined && this.selectedPartner !== null) {
            this.partnerService.removePartner(this.selectedPartner.id).then(
                (success) => {
                    if (success) {
                        this.reorderPartners();
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

    saveChanges(): Promise<boolean> {
        if (!this.hasChanges) return Promise.resolve(true);

        const promises = [];

        this.partners.forEach((partner) => {
            promises.push(this.partnerService.updatePartner(partner));
        });

        return Promise.all(promises).then(() => {
            return true;
        });
    }
}
