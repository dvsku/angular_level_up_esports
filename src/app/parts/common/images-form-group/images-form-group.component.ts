import {
    Component,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ElementRef
} from '@angular/core';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ImageInputComponent } from '../image-input/image-input.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-images-form-group',
    templateUrl: './images-form-group.component.html',
    styleUrls: ['./images-form-group.component.sass']
})
export class ImagesFormGroupComponent {
    @Input('images')
    images: ProductIcon[];

    @ViewChild('parent', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('modal')
    modal: ElementRef;

    cropperImageBase64 = '';
    croppedImage: any = '';

    constructor(private _cfr: ComponentFactoryResolver, private modalService: NgbModal) {}

    imageCropped(event: ImageCroppedEvent): void {
        this.images.push(new ProductIcon(null, event.base64, 0));
        this.reorderImages();
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
            image.iconOrder = index + 1;
        });
    }

    addImage(): void {
        const component = this._cfr.resolveComponentFactory(ImageInputComponent);
        const createdComponent = this.container.createComponent(component);
        createdComponent.instance._parent = this;
        createdComponent.changeDetectorRef.detectChanges();
        createdComponent.instance.openFileSelectDialog();
    }

    removeImage(image: ProductIcon): void {
        const index = this.images.indexOf(image);
        if (index > -1) {
            this.images.splice(index, 1);
        }
    }
}
