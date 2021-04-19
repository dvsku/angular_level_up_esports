import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ModelWithImage } from 'src/app/models/base/ModelWithImage';
import { ImagesHandler } from 'src/app/models/interfaces/ImagesHandler';
import { ImageInputComponent } from '../image-input/image-input.component';

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

    @ViewChild('modal')
    modal: ElementRef;

    cropperImageBase64 = '';
    croppedImage: any = '';

    parent: ImagesHandler;

    constructor(private _cfr: ComponentFactoryResolver, private modalService: NgbModal) {}

    imageCropped(event: ImageCroppedEvent): void {
        this.parent.createImage(event.base64);
        this.parent.reorderImages();
        //if(this.images instanceof HomeRotatingPicture[])
        /*  this.images.push(new ProductIcon(null, event.base64, 0));
        this.reorderImages(); */
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
        /* const index = this.images.indexOf(image);
        if (index > -1) {
            this.images.splice(index, 1);
        } */
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
