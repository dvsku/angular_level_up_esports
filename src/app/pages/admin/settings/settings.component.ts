import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
    isMaintenance: boolean;

    constructor(private maintenanceService: MaintenanceService) {}

    ngOnInit(): void {
        this.isMaintenance = this.maintenanceService.isMaintenance;
    }

    toggleMaintenanceMode() {
        if (this.isMaintenance) {
            console.log('disabled');
        } else {
            console.log('enabled');
        }
        this.isMaintenance = !this.isMaintenance;
    }
}
