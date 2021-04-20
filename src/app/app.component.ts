import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { fadeAnimation } from './_animations/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
    constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        const appTitle = this.titleService.getTitle();
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let child = this.activatedRoute.firstChild;
                    while (child.firstChild) {
                        child = child.firstChild;
                    }
                    if (child.snapshot.data['title']) {
                        return child.snapshot.data['title'];
                    }
                    return appTitle;
                })
            )
            .subscribe((ttl: string) => {
                this.titleService.setTitle(ttl);
            });
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData;
        //return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
    }
}
