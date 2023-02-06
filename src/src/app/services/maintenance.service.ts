import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {
    private maintenanceAdminUrl = environment.apiURL + `admin/maintenance`;

    constructor(private httpClient: HttpClient) {}

    getMaintenanceMode(): Promise<boolean> {
        return this.getCurrentMaintenanceStatus().then(
            (value) => {
                return <boolean>(<unknown>value);
            },
            () => {
                return true;
            }
        );
    }

    changeMaintenanceMode(): Promise<boolean> {
        return this.changeMaintenanceToOppositeStatus().then(
            (value) => {
                return value;
            },
            () => {
                return false;
            }
        );
    }

    private getCurrentMaintenanceStatus(): Promise<number> {
        const url = `${this.maintenanceAdminUrl}/get`;
        return this.httpClient
            .get<number>(url)
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

    private changeMaintenanceToOppositeStatus(): Promise<boolean> {
        const url = `${this.maintenanceAdminUrl}/change`;
        return this.httpClient
            .put<boolean>(url, null)
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
