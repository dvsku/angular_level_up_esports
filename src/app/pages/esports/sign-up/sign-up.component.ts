import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
 	user: User;
	secondPassword: string;

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(){
	console.log(this.user)
    this.userService.signup(this.user).subscribe(data => {
      this.router.navigate(['/esports'] , {queryParams : {registered : 'true'}});
      this.toastrService.success('Successful registration , please check your email to activate account');
    },error => {
        console.log(error)
    });
  }

}
