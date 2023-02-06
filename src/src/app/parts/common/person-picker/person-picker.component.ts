import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';
import { GenericModalComponent } from '../../modals/generic-modal/generic-modal.component';

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
    personPickerModal: GenericModalComponent;

    faTimes = faTimes;

    constructor(public imageService: ImagesService) {}

    ngOnInit(): void {
        if (this.people && this.subtract) {
            this.people = this.people.filter((person) => {
                return this.subtract.findIndex((x) => x.id === person.id) < 0;
            });
        }
    }

    open(): void {
        this.personPickerModal.show();
    }

    close() {
        this.selectedChange.emit(this.selected);
    }
}
