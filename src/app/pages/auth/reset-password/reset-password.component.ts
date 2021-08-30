import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
    private token: string;

    public model: any = {
        password: '',
        confirmPassword: ''
    };

    state = 0;

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        const token: string = this.activatedRoute.snapshot.paramMap.get('token');
        if (token === null || token === undefined || token === '') {
            this.router.navigate(['/']);
        } else {
            this.token = token;
        }
    }

    onSubmit(): void {
        this.state = 1;
        this.userService.resetPassword(this.token, this.model.password).then(
            (success) => {
                if (success) {
                    this.state = 2;
                } else {
                    this.state = 0;
                    this.toastrService.error('Failed to reset password.');
                }
            },
            () => {
                this.state = 0;
                this.toastrService.error('Failed to reset password.');
            }
        );
    }
}
