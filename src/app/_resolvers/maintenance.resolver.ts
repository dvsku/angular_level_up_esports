import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MaintenanceService } from '../services/maintenance.service';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceResolver implements Resolve<boolean> {
    constructor(private maintenanceService: MaintenanceService) {}

    resolve(): Promise<boolean> {
        return this.maintenanceService.getMaintenanceMode().then(
            (value) => {
                return value;
            },
            () => {
                return true;
            }
        );
    }
}
