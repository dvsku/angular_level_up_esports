import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ImagesService } from 'src/app/services/images.service';
import { ImageInputComponent } from '../image-input/image-input.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { GenericModalComponent } from '../../modals/generic-modal/generic-modal.component';

@Component({
    selector: 'image-group',
    templateUrl: './image-group.component.html',
    styleUrls: ['./image-group.component.sass']
})
export class ImageGroupComponent {
    @Input('images')
    images: ModelWithImage[];

    @Input('maintainAspectRatio')
    maintainAspectRatio = true;

    @Input('resizeToWidth')
    resizeToWidth = 1280;

    @Input('resizeToHeight')
    resizeToHeight = 720;

    @Input('aspectRatio')
    aspectRatio = 1 / 1;

    @Input('aspectRatioLocked')
    aspectRatioLocked = 1 / 1;

    @Input('isApspectRatioUnlockable')
    isApspectRatioUnlockable = false;

    @ViewChild('parent', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('cropImageModal')
    cropImageModal: GenericModalComponent;

    cropperImageBase64 = '';
    croppedImage: any = '';

    parent: ImagesHandler;

    faRemove = faTimes;

    constructor(private _cfr: ComponentFactoryResolver, public imagesService: ImagesService) {}

    imageCropped(event: ImageCroppedEvent): void {
        this.parent.createImage(event.base64);
        this.parent.reorderImages();
    }

    resizeImage(imageBase64: string): void {
        if (imageBase64 !== '') {
            this.cropperImageBase64 = imageBase64;
            this.cropImageModal.show();
        }
    }

    addImage(): void {
        const component = this._cfr.resolveComponentFactory(ImageInputComponent);
        const createdComponent = this.container.createComponent(component);
        createdComponent.instance._parent = this;
        createdComponent.changeDetectorRef.detectChanges();
        createdComponent.instance.openFileSelectDialog();
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.images, event.previousIndex, event.currentIndex);
        this.parent.reorderImages();
    }

    removeImage(image: ModelWithImage): void {
        this.parent.removeImage(image);
        this.parent.reorderImages();
    }

    toggleAspectRatio() {
        this.maintainAspectRatio = !this.maintainAspectRatio;
        if (this.maintainAspectRatio) {
            this.aspectRatio = this.aspectRatioLocked;
        } else {
            this.aspectRatio = 1 / 1;
        }
    }
}
