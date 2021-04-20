import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.sass']
})
export class GeneralComponent implements OnInit {
    user: User;
    currentUser: JwtResponse;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.currentUser = this.userService.getCurrentUser();
        this.userService.getUserProfile(this.currentUser.account).then((user) => {
            this.user = user;
        });
    }
}
