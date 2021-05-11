import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'person-picker',
    templateUrl: './person-picker.component.html',
    styleUrls: ['./person-picker.component.sass']
})
export class PersonPickerComponent implements OnInit {
    @Input()
    people: Person[];

    @Input()
    subtract: Person[];

    @Input()
    selected: Person;

    @Output()
    selectedChange = new EventEmitter<Person>();

    @ViewChild('personPickerModal')
    personPickerModal: ElementRef;

    faTimes = faTimes;

    constructor(public imageService: ImagesService, private modalService: NgbModal) {}

    ngOnInit(): void {
        if (this.people && this.subtract) {
            this.people = this.people.filter((person) => {
                return this.subtract.findIndex((x) => x.id === person.id) < 0;
            });
        }
    }

    open(): void {
        this.modalService.open(this.personPickerModal, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-dialog-standard',
            backdrop: 'static'
        });
    }

    close() {
        this.selectedChange.emit(this.selected);
    }
}
