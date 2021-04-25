import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private personServiceUrl = environment.apiURL + `person`;
    private personServiceAdminUrl = environment.apiURL + `admin/person`;

    constructor(private httpClient: HttpClient) {}

    public getOnePerson(personId: number): Observable<Person> {
        const url = `${this.personServiceUrl}/${personId}`;
        return this.httpClient.get<Person>(url).pipe(
            tap((data) => {
                // LOG
            })
        );
    }

    public getAllPersons(): Observable<Person[]> {
        const url = `${this.personServiceUrl}/list`;
        return this.httpClient.get<Person[]>(url);
    }

    public addNewPerson(person: Person): Observable<boolean> {
        const url = `${this.personServiceAdminUrl}/add`;
        return this.httpClient.post<boolean>(url, person).pipe(
            tap((data) => {
                console.log('Person added -> ' + data);
            })
        );
    }

    public editExistingPerson(personId: number, person: Person): Observable<boolean> {
        const url = `${this.personServiceAdminUrl}/edit/${personId}`;
        return this.httpClient.put<boolean>(url, person).pipe(
            tap((data) => {
                console.log('Person edited -> ' + data);
            })
        );
    }

    public deleteExistingPerson(personId: number): Observable<boolean> {
        const url = `${this.personServiceAdminUrl}/delete/${personId}`;
        return this.httpClient.delete<boolean>(url).pipe(
            tap((data) => {
                console.log('Person edited -> ' + data);
            })
        );
    }
}
