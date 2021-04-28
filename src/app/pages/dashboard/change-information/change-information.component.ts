import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserWithoutPassDto } from 'src/app/models/UserWithoutPassDto';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-change-information',
    templateUrl: './change-information.component.html',
    styleUrls: ['./change-information.component.sass']
})
export class ChangeInformationComponent implements OnInit {
    model: UserWithoutPassDto;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { user: User }) => {
            if (data.user === undefined || data.user === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.model = new UserWithoutPassDto(
                    data.user.email,
                    data.user.firstName,
                    data.user.lastName,
                    data.user.phone,
                    data.user.city,
                    data.user.streetAndNumber,
                    data.user.zip
                );
            }
        });
    }

    onSubmit(): void {
        this.model.zip = +this.model.zip;
        this.userService.updateInformation(this.model).then(
            (success) => {
                if (success) {
                    this.toastrService.success('Information updated');
                    this.userService.updateCurrentUserName(this.model.firstName);
                } else {
                    this.toastrService.error('Failed to update information');
                }
            },
            () => {
                this.toastrService.error('Failed to update information');
            }
        );
    }
}
