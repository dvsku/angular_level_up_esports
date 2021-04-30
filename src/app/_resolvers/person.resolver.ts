import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Person } from '../models/Person';
import { PersonService } from '../services/person.service';

@Injectable({
    providedIn: 'root'
})
export class PersonResolver implements Resolve<Person> {
    constructor(private personService: PersonService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Person> {
        const id = route.params['id'];
        return this.personService.getPerson(id).then(
            (user) => {
                return user;
            },
            () => {
                return undefined;
            }
        );
    }
}
