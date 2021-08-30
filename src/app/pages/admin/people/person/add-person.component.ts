import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-add-person',
    templateUrl: './person.template.html',
    styleUrls: ['./person.style.sass']
})
export class AddPersonComponent {
    person: Person = new Person();
    title = 'Add Person';

    constructor(
        private personService: PersonService,
        private router: Router,
        private toastrService: ToastrService,
        public imagesService: ImagesService
    ) {}

    onSubmit(): void {
        this.personService.createPerson(this.person).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'people' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Person created.');
                        });
                } else {
                    this.toastrService.error('Failed to create person.');
                }
            },
            () => {
                this.toastrService.error('Failed to create person.');
            }
        );
    }
}
