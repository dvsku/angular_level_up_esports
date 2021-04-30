import { Component, OnDestroy, OnInit } from '@angular/core';
import { faAngleDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit, OnDestroy {
    people: Person[];
    selectedPerson: Person;
    private peopleSubscription: Subscription;

    faArrowDown = faAngleDown;
    faInfo = faInfo;

    constructor(
        private personService: PersonService,
        private toastrService: ToastrService,
        private modalService: NgbModal,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.peopleSubscription = this.personService.getPeople().subscribe((people) => {
            this.people = people;
        });
    }

    ngOnDestroy(): void {
        if (this.peopleSubscription) this.peopleSubscription.unsubscribe();
    }

    showModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onRemoveOk(): void {
        if (this.selectedPerson !== undefined && this.selectedPerson !== null) {
            this.personService.removePerson(this.selectedPerson.id).then(
                (success) => {
                    if (success) {
                        this.toastrService.success('Person removed.');
                    } else {
                        this.toastrService.error('Failed to remove person.');
                    }
                },
                () => {
                    this.toastrService.error('Failed to remove person.');
                }
            );
        }
    }
}
