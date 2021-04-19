import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {
    public isMaintenance = false;

    constructor(private httpClient: HttpClient) {}

    enableMaintenanceMode(): void {}
    disableMaintenanceMode(): void {}
}
