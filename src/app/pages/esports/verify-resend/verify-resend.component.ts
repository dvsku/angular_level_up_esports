import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-verify-resend',
    templateUrl: './verify-resend.component.html',
    styleUrls: ['./verify-resend.component.sass']
})
export class VerifyResendComponent {
    public model: any = {
        email: ''
    };

    state = 0;

    constructor(private userService: UserService, private toastrService: ToastrService) {}

    onSubmit(): void {
        this.state = 1;
        this.userService.resendConfirmationToken(this.model.email).subscribe(
            (success) => {
                if (success) {
                    this.state = 2;
                } else {
                    this.state = 0;
                    this.toastrService.error('Failed to send verification email.');
                }
            },
            () => {
                this.state = 0;
                this.toastrService.error('Failed to send verification email.');
            }
        );
    }
}
