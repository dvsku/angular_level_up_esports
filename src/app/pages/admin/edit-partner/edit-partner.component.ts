import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerService } from 'src/app/services/partner.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-partner',
    templateUrl: '../add-partner/add-partner.component.html',
    styleUrls: ['../add-partner/add-partner.component.sass']
})
export class EditPartnerComponent implements OnInit {
    partner: Partner = new Partner();
    title = 'Edit Partner';

    @ViewChild('fileInput')
    fileInput: ElementRef;

    @ViewChild('modal')
    modal: ElementRef;

    faEyeSlash = faEyeSlash;
    faTimes = faTimes;

    cropperImageBase64 = '';
    croppedImage: any = '';

    constructor(
        private modalService: NgbModal,
        private partnerService: PartnerService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { partner: Partner }) => {
            if (data.partner === undefined || data.partner === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.partner = data.partner;
            }
        });
    }

    openFileSelectDialog(): void {
        this.fileInput.nativeElement.click();
    }

    fileSelected(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.resizeImage(reader.result.toString());
        };
    }

    resizeImage(imageBase64: string): void {
        if (imageBase64 !== '') {
            this.cropperImageBase64 = imageBase64;
            this.modalService.open(this.modal, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static'
            });
        }
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.partner.image = event.base64;
    }

    removeImage(): void {
        this.partner.image = null;
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
