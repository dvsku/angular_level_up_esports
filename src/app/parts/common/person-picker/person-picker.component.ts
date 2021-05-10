import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

    @ViewChild('modal')
    modal: ElementRef;

    constructor(public imageService: ImagesService, private modalService: NgbModal) {}

    ngOnInit(): void {
        if (this.people && this.subtract) {
            this.people = this.people.filter((person) => {
                return this.subtract.findIndex((x) => x.id === person.id) < 0;
            });
        }
    }

    open(): void {
        this.modalService.open(this.modal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
            backdrop: 'static'
        });
    }

    close() {
        this.selectedChange.emit(this.selected);
    }
}
