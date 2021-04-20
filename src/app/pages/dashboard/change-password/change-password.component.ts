import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PasswordDto } from 'src/app/models/PasswordDto';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
    model = new PasswordDto();
    secondPassword = '';
    private currentUser: JwtResponse;

    constructor(private userService: UserService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.currentUser = this.userService.getCurrentUser();
        this.model.email = this.currentUser.account;
    }

    onSubmit(): void {
        this.userService.updatePassword(this.model).then(
            (success) => {
                if (success) {
                    this.toastrService.success('Password changed');
                } else {
                    this.toastrService.error('Failed to change password');
                }
            },
            () => {
                this.toastrService.error('Failed to change password');
            }
        );
    }
}
