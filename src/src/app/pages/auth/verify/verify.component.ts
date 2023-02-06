import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.sass']
})
export class VerifyComponent implements OnInit {
    status = -1;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const token: string = this.activatedRoute.snapshot.paramMap.get('token');
        if (token === null || token === undefined || token === '') {
            this.router.navigate(['/']);
        } else {
            this.userService.verify(token).then(
                (status) => {
                    this.status = status;
                    if (this.status === 2) {
                        this.router.navigate(['/']);
                    }
                },
                () => {
                    console.log('failed to verify');
                }
            );
        }
    }
}
