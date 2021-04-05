import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-esports-home',
    templateUrl: './esports-home.component.html',
    styleUrls: ['./esports-home.component.sass']
})
export class EsportsHomeComponent {
    constructor(config: NgbCarouselConfig) {
        config.showNavigationArrows = false;
        config.interval = 2500;
        config.pauseOnFocus = false;
        config.pauseOnHover = false;
        config.wrap = true;
    }
}
