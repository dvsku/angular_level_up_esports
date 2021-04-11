import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HomeRotatingPicture } from 'src/app/models/HomeRotatingPicture';
import { HomePictureService } from 'src/app/services/home-picture.service';

@Component({
    selector: 'app-esports-home',
    templateUrl: './esports-home.component.html',
    styleUrls: ['./esports-home.component.sass']
})
export class EsportsHomeComponent implements OnInit, OnDestroy {
    rotatingImages: HomeRotatingPicture[];
    rotatingImagesSubscription: Subscription;

    constructor(private config: NgbCarouselConfig, private homeImagesService: HomePictureService) {
        config.showNavigationArrows = false;
        config.interval = 5000;
        config.pauseOnFocus = false;
        config.pauseOnHover = false;
        config.wrap = true;
    }

    ngOnInit() {
        this.rotatingImagesSubscription = this.homeImagesService.getHomeRotatingPictures().subscribe((images) => {
            this.rotatingImages = images;
        });
    }

    ngOnDestroy() {
        this.rotatingImagesSubscription.unsubscribe();
    }
}
