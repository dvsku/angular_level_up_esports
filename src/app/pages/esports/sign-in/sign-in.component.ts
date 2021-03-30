import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/UserRole';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
	model : any = {
		username : '',
		password : '',
		remembered : true
	};

	constructor(private userService: UserService, private router: Router) { 

	}

	ngOnInit(): void {}

	onSubmit() {
		console.log(this.model);
		this.userService.login(this.model).subscribe(jwtResponse => {
			if(jwtResponse){
				this.router.navigateByUrl('/esports');
			}
		});
	}
}
