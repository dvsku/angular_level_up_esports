import { Component, ElementRef, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.sass']
})
export class ImagePreviewComponent {
    @ViewChild('imagePreviewModal')
    modal: ElementRef;

    faTimes = faTimes;

    image: string;

    constructor(private modalService: NgbModal) {}

    show(image: string) {
        this.image = image;
        this.modalService.open(this.modal, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-dialog-100',
            backdrop: 'static'
        });
    }
}
