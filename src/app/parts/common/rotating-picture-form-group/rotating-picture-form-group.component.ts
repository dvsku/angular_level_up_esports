import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { HomeRotatingPicture } from 'src/app/models/HomeRotatingPicture';
import { HomePictureService } from 'src/app/services/home-picture.service';
import { ImageInputComponent } from '../image-input/image-input.component';

@Component({
    selector: 'app-rotating-picture-form-group',
    templateUrl: './rotating-picture-form-group.component.html',
    styleUrls: ['./rotating-picture-form-group.component.sass']
})
export class RotatingPictureFormGroupComponent implements OnInit, OnDestroy {
    @Input('images')
    images: HomeRotatingPicture[];
    imagesSubscription: Subscription;

    @ViewChild('parent', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('modal')
    modal: ElementRef;

    cropperImageBase64 = '';
    croppedImage: any = '';

    constructor(
        private homePictureService: HomePictureService,
        private _cfr: ComponentFactoryResolver,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.imagesSubscription = this.homePictureService.getHomeRotatingPictures().subscribe((pictures) => {
            this.images = pictures;
        });
    }

    ngOnDestroy(): void {
        this.imagesSubscription.unsubscribe();
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.homePictureService.addHomeRotatingPicture(new HomeRotatingPicture(event.base64, 0)).subscribe(
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

    resizeImage(imageBase64: string): void {
        if (imageBase64 !== '') {
            this.cropperImageBase64 = imageBase64;
            this.modalService.open(this.modal, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'xl',
                backdrop: 'static'
            });
        }
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.images, event.previousIndex, event.currentIndex);
        this.reorderImages();
    }

    reorderImages(): void {
        this.images.forEach((image, index) => {
            image.pictureOrder = index + 1;
        });
    }

    addImage(): void {
        const component = this._cfr.resolveComponentFactory(ImageInputComponent);
        const createdComponent = this.container.createComponent(component);
        createdComponent.instance._parent = this;
        createdComponent.changeDetectorRef.detectChanges();
        createdComponent.instance.openFileSelectDialog();
    }

    removeImage(image: HomeRotatingPicture): void {
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

    updateImages(): void {
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
