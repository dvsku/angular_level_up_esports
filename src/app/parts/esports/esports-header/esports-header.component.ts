import { Component, OnInit } from '@angular/core';
import { faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-esports-header',
  templateUrl: './esports-header.component.html',
  styleUrls: ['./esports-header.component.sass']
})
export class EsportsHeaderComponent implements OnInit {

	public isMenuCollapsed: boolean = true;
	public isShopCollapsed: boolean = true;
	public isTeamsCollapsed: boolean = true;
	faBars = faBars;
	faArrowDown = faAngleDown

	currentUserSubscription : Subscription;
	currentUser : JwtResponse;

	constructor(private userService : UserService) {}

	ngOnInit(): void {
		this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	logout() {
		this.userService.logout();
	}

	toggleMenu() {
		this.isMenuCollapsed = !this.isMenuCollapsed;
		this.isShopCollapsed = true;
		this.isTeamsCollapsed = true;
	}

	toggleShop() {
		this.isShopCollapsed = !this.isShopCollapsed;
		this.isTeamsCollapsed = true;
	}

	toggleTeams() {
		this.isShopCollapsed = true;
		this.isTeamsCollapsed = !this.isTeamsCollapsed;
	}
}