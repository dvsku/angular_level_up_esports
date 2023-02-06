import { Component, OnInit } from '@angular/core';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { User } from 'src/app/models/User';
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
