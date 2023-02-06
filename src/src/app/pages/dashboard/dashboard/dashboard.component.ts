import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
    public isSettingsCollapsed = true;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.navigate(['/dashboard', { outlets: { userOutlet: 'general' } }], { skipLocationChange: true });
    }
}
