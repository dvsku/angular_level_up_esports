import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'image-select',
    templateUrl: './image-select.component.html',
    styleUrls: ['./image-select.component.sass']
})
export class ImageSelectComponent {
    @Input()
    image: string;

    @Output()
    imageChange = new EventEmitter<string>();

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

    @ViewChild('fileInput')
    fileInput: ElementRef;

    @ViewChild('modal')
    modal: ElementRef;

    faTimes = faTimes;
    faEyeSlash = faEyeSlash;

    cropperImageBase64 = '';
    croppedImage: any = '';

    constructor(public imageService: ImagesService, private modalService: NgbModal) {}

    openFileSelectDialog(): void {
        this.fileInput.nativeElement.click();
    }

    fileSelected(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.resizeImage(reader.result.toString());
        };
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

    imageCropped(event: ImageCroppedEvent): void {
        this.imageChange.emit(event.base64);
    }

    removeImage(): void {
        this.imageChange.emit(null);
    }
}
