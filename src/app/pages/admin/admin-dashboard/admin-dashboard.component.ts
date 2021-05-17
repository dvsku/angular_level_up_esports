import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent {
    public isBarcraftCollapsed = true;
    public isShopCollapsed = true;
    public isTeamsCollapsed = true;
}
