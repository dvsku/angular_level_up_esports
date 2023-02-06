import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private personServiceUrl = environment.apiURL + `person`;
    private personServiceAdminUrl = environment.apiURL + `admin/person`;

    private people: Person[] = null;
    private peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(this.people);
    private peopleObs: Observable<Person[]> = this.peopleSubject.asObservable();

    constructor(private httpClient: HttpClient) {}

    public getPeople(): Observable<Person[]> {
        if (this.people === null) {
            this.fetchPeople().subscribe((people) => {
                this.people = people;
                this.peopleSubject.next(this.people);
                this.peopleObs.pipe(publishReplay(1), refCount());
            });
        }
        return this.peopleObs;
    }

    private fetchPeople(): Observable<Person[]> {
        const url = `${this.personServiceUrl}/list`;
        return this.httpClient.get<Person[]>(url);
    }

    public getPerson(personId: number): Promise<Person> {
        let person = undefined;
        if (this.people !== null && this.people !== undefined) {
            person = this.people.find((x) => x.id === +personId);
        }
        if (person === undefined) {
            return this.fetchPerson(personId)
                .then((person) => {
                    return person;
                })
                .catch(() => {
                    return undefined;
                });
        } else {
            return Promise.resolve(person);
        }
    }

    private fetchPerson(personId: number): Promise<Person> {
        const url = `${this.personServiceUrl}/${personId}`;
        return this.httpClient
            .get<Person>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public createPerson(person: Person): Promise<boolean> {
        return this.createDatabasePerson(person).then(
            (response) => {
                if (this.peopleObs) {
                    if (this.people !== null && this.people !== undefined) {
                        person.id = response;
                        this.people.push(person);
                        this.peopleSubject.next(this.people);
                    }
                }
                return true;
            },
            () => {
                return false;
            }
        );
    }

    private createDatabasePerson(person: Person): Promise<number> {
        const url = `${this.personServiceAdminUrl}/add`;
        return this.httpClient
            .post<number>(url, person)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public updatePerson(person: Person): Promise<boolean> {
        return this.updateDatabasePerson(person).then(
            (success) => {
                if (success && this.peopleObs && this.people) {
                    const index = this.people.findIndex((x) => x.id === person.id);
                    if (index !== -1) {
                        this.people[index] = person;
                        this.peopleSubject.next(this.people);
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private updateDatabasePerson(person: Person): Promise<boolean> {
        const url = `${this.personServiceAdminUrl}/edit/${person.id}`;
        return this.httpClient
            .put<boolean>(url, person)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }

    public removePerson(personId: number): Promise<boolean> {
        return this.removeDatabasePerson(personId).then(
            (success) => {
                if (success && this.peopleObs && this.people) {
                    const index = this.people.findIndex((x) => x.id === personId);
                    if (index !== -1) {
                        this.people.splice(index, 1);
                        this.peopleSubject.next(this.people);
                    }
                }
                return success;
            },
            () => {
                return false;
            }
        );
    }

    private removeDatabasePerson(personId: number): Promise<boolean> {
        const url = `${this.personServiceAdminUrl}/delete/${personId}`;
        return this.httpClient
            .delete<boolean>(url)
            .toPromise()
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error.message || error);
                }
            );
    }
}
