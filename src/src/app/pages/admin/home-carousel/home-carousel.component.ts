import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { HomeRotatingPicture } from 'src/app/models/HomeRotatingPicture';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ImageGroupComponent } from 'src/app/parts/common/image-group/image-group.component';
import { HomePictureService } from 'src/app/services/home-picture.service';
import { faInfo, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetection } from 'src/app/models/interfaces/ChangeDetection';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home-carousel',
    templateUrl: './home-carousel.component.html',
    styleUrls: ['./home-carousel.component.sass']
})
export class HomeCarouselComponent implements OnInit, OnDestroy, AfterViewInit, ImagesHandler, ChangeDetection {
    images: HomeRotatingPicture[];
    private imagesSubscription: Subscription;

    @ViewChild(ImageGroupComponent)
    imageGroup: ImageGroupComponent;

    faInfo = faInfo;
    faPlus = faPlus;
    faSave = faSave;

    private hasChanges = false;

    constructor(private homePictureService: HomePictureService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.imagesSubscription = this.homePictureService.getHomeRotatingPictures().subscribe((images) => {
            this.images = images;
        });
    }

    ngOnDestroy(): void {
        if (this.imagesSubscription !== null && this.imagesSubscription !== undefined) {
            this.imagesSubscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this.imageGroup.parent = this;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	ImagesHandler interface
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    createImage(image: string): void {
        this.homePictureService
            .createHomeRotatingPicture(new HomeRotatingPicture({ image: image, displayOrder: 0 }))
            .then(
                (success) => {
                    if (success) {
                        this.reorderImages();
                        this.toastrService.success('Home rotating picture created.');
                    } else {
                        this.toastrService.error('Failed to create home rotating picture.');
                    }
                },
                () => {
                    this.toastrService.error('Failed to create home rotating picture.');
                }
            );
    }

    removeImage(image: ModelWithImage): void {
        this.homePictureService.removeHomeRotatingPicture(image).then(
            (success) => {
                if (success) {
                    this.reorderImages();
                    this.toastrService.success('Home rotating picture removed.');
                } else {
                    this.toastrService.error('Failed to remove home rotating picture.');
                }
            },
            () => {
                this.toastrService.error('Failed to remove home rotating picture.');
            }
        );
    }

    reorderImages(): void {
        this.images.forEach((image, index) => {
            image.displayOrder = index + 1;
        });
        this.hasChanges = true;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	IMAGES
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addImageInput(): void {
        this.imageGroup.addImage();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //	FORM
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    saveChanges(): Promise<boolean> {
        if (!this.hasChanges) return Promise.resolve(true);

        const promises = [];

        this.images.forEach((image) => {
            promises.push(this.homePictureService.updateHomeRotatingPicture(image));
        });

        return Promise.all(promises).then(() => {
            return true;
        });
    }
}
