import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HomeRotatingPicture } from 'src/app/models/HomeRotatingPicture';
import { HomePictureService } from 'src/app/services/home-picture.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/Partner';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-esports-home',
    templateUrl: './esports-home.component.html',
    styleUrls: ['./esports-home.component.sass']
})
export class EsportsHomeComponent implements OnInit, OnDestroy {
    faHeart = faHeart;
    rotatingImages: HomeRotatingPicture[];
    partners: Partner[];

    private rotatingImagesSubscription: Subscription;
    private partnersSubscription: Subscription;

    constructor(
        private config: NgbCarouselConfig,
        private homeImagesService: HomePictureService,
        private partnerService: PartnerService,
        public imagesService: ImagesService
    ) {
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
        this.partnersSubscription = this.partnerService.getPartners().subscribe((partners) => {
            this.partners = partners;
        });
    }

    ngOnDestroy() {
        if (this.rotatingImagesSubscription !== null && this.rotatingImagesSubscription !== undefined) {
            this.rotatingImagesSubscription.unsubscribe();
        }
        if (this.partnersSubscription !== null && this.partnersSubscription !== undefined) {
            this.partnersSubscription.unsubscribe();
        }
    }
}
