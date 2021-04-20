import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
    public model: any = {
        email: ''
    };

    state = 0;

    constructor(private userService: UserService, private toastrService: ToastrService) {}

    onSubmit(): void {
        this.state = 1;
        this.userService.sendPasswordTokenToEmail(this.model.email).then(
            (success) => {
                if (success) {
                    this.state = 2;
                } else {
                    this.state = 0;
                    this.toastrService.error('Failed to send reset password token.');
                }
            },
            () => {
                this.state = 0;
                this.toastrService.error('Failed to send reset password token.');
            }
        );
    }
}
