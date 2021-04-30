import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-edit-person',
    templateUrl: '../add-person/add-person.component.html',
    styleUrls: ['../add-person/add-person.component.sass']
})
export class EditPersonComponent implements OnInit {
    person: Person = new Person();
    title = 'Add Person';

    constructor(
        private personService: PersonService,
        private router: Router,
        private toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { person: Person }) => {
            if (data.person === undefined || data.person === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.person = data.person;
            }
        });
    }

    onSubmit(): void {
        this.personService.updatePerson(this.person).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'people' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Person updated.');
                        });
                } else {
                    this.toastrService.error('Failed to update person.');
                }
            },
            () => {
                this.toastrService.error('Failed to update person.');
            }
        );
    }
}
