import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {
	public isBarcraftCollapsed: boolean = true;
	public isEsportsCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
