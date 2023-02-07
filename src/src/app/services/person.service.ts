import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private personServiceUrl = environment.apiURL + `person`;
    private personServiceAdminUrl = environment.apiURL + `admin/person`;

    private people: Person[] = [new Person(1, 'Luka', 'Čiča', 'people/panj.jpg', 'Serbian')];
    private peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(this.people);
    private peopleObs: Observable<Person[]> = this.peopleSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getPeople(): Observable<Person[]> {
        return this.peopleObs;
    }

    public getPerson(personId: number): Promise<Person> {
        let person = undefined;
        if (this.people !== null && this.people !== undefined) {
            person = this.people.find((x) => x.id === +personId);
        }
        if (person === undefined) {
            return Promise.reject();
        } else {
            return Promise.resolve(person);
        }
    }

    public createPerson(person: Person): Promise<boolean> {
        return Promise.resolve(true);
    }

    public updatePerson(person: Person): Promise<boolean> {
        return Promise.resolve(true);
    }

    public removePerson(personId: number): Promise<boolean> {
        return Promise.resolve(true);
    }
}
