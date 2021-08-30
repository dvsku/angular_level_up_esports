import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
    user: User;
    secondPassword: string;

    constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) {
        this.user = new User();
    }

    onSubmit(): void {
        this.userService.signUp(this.user).then(
            (success) => {
                if (success) {
                    this.router.navigate(['/'], {
                        queryParams: { registered: 'true' }
                    });
                    this.toastrService.success('Account created. Please check your email to activate your account.');
                } else {
                    this.toastrService.error('Failed to create account, please try again later.');
                }
            },
            () => {
                this.toastrService.error('Failed to create account, please try again later.');
            }
        );
    }
}
