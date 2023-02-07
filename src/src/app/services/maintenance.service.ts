import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {
    getMaintenanceMode(): Promise<boolean> {
        return Promise.resolve(false);
    }

    changeMaintenanceMode(): Promise<boolean> {
        return Promise.resolve(true);
    }
}
