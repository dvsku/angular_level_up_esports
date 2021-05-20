import { Component, ElementRef, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'generic-modal',
    templateUrl: './generic-modal.component.html',
    styleUrls: ['./generic-modal.component.sass']
})
export class GenericModalComponent {
    faTimes = faTimes;

    @ViewChild('genericModal')
    private genericModal: ElementRef;

    private activeModal: NgbActiveModal;

    constructor(private modalService: NgbModal) {}

    public show() {
        this.activeModal = this.modalService.open(this.genericModal, {
            windowClass: 'modal-dialog-standard',
            backdrop: 'static'
        });
    }

    public close() {
        if (this.activeModal) {
            this.activeModal.close();
        }
    }
}
