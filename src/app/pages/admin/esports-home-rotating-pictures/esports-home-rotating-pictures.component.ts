import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { HomeRotatingPicture } from 'src/app/models/HomeRotatingPicture';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ImageGroupComponent } from 'src/app/parts/common/image-group/image-group.component';
import { HomePictureService } from 'src/app/services/home-picture.service';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-esports-home-rotating-pictures',
    templateUrl: './esports-home-rotating-pictures.component.html',
    styleUrls: ['./esports-home-rotating-pictures.component.sass']
})
export class EsportsHomeRotatingPicturesComponent implements OnInit, OnDestroy, AfterViewInit, ImagesHandler {
    images: HomeRotatingPicture[];
    private imagesSubscription: Subscription;

    @ViewChild(ImageGroupComponent)
    imageGroup: ImageGroupComponent;

    faInfo = faInfo;

    constructor(private homePictureService: HomePictureService) {}

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
        this.homePictureService.addHomeRotatingPicture(new HomeRotatingPicture(image, 0)).subscribe(
            (success) => {
                if (success) {
                    this.reorderImages();
                } else {
                    console.log('Failed to add image');
                }
            },
            () => {
                console.log('Failed to add image');
            }
        );
    }

    removeImage(image: ModelWithImage): void {
        this.homePictureService.deleteHomeRotatingPicture(image).subscribe(
            (success) => {
                if (success) {
                    this.reorderImages();
                } else {
                    console.log('Failed to remove image');
                }
            },
            () => {
                console.log('Failed to remove image');
            }
        );
    }

    reorderImages(): void {
        this.images.forEach((image, index) => {
            image.displayOrder = index + 1;
        });
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

    onSubmit(): void {
        for (const image of this.images) {
            if (image.id !== null && image.id !== -1) {
                this.homePictureService.updateHomeRotatingPicture(image).subscribe(
                    (success) => {
                        if (!success) {
                            console.log('Failed to update image');
                        }
                    },
                    () => {
                        console.log('Failed to update image');
                    }
                );
            }
        }
    }
}
