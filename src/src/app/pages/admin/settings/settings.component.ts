import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
    isMaintenance: boolean;

    constructor(
        private maintenanceService: MaintenanceService,
        private activatedRoute: ActivatedRoute,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { isMaintenance: boolean }) => {
            this.isMaintenance = data.isMaintenance;
        });
    }

    toggleMaintenanceMode() {
        this.maintenanceService.changeMaintenanceMode().then(
            (success) => {
                if (success) {
                    this.toastrService.success('Maintenance mode changed.');
                    this.isMaintenance = !this.isMaintenance;
                } else {
                    this.toastrService.error('Failed to change maintenance mode.');
                }
            },
            () => {
                this.toastrService.error('Failed to change maintenance mode.');
            }
        );
    }
}
