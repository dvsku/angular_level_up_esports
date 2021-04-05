import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImagesFormGroupComponent } from '../images-form-group/images-form-group.component';

@Component({
    selector: 'app-image-input',
    templateUrl: './image-input.component.html',
    styleUrls: ['./image-input.component.sass']
})
export class ImageInputComponent {
    _parent: ImagesFormGroupComponent;

    @ViewChild('fileInput')
    fileInput: ElementRef;

    openFileSelectDialog(): void {
        this.fileInput.nativeElement.click();
    }

    fileSelected(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this._parent.resizeImage(reader.result.toString());
        };
    }
}
