import { Component, OnInit, Input, ViewChild, ViewChildren,  ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ImageInputComponent } from '../image-input/image-input.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-images-form-group',
  templateUrl: './images-form-group.component.html',
  styleUrls: ['./images-form-group.component.sass']
})
export class ImagesFormGroupComponent implements OnInit {
	@Input("images")
	images: ProductIcon[]

	@ViewChild("parent", { read: ViewContainerRef })
	container: ViewContainerRef;

	@ViewChild("modal")
	modal: ElementRef

	cropperImageBase64: string = '';
	croppedImage: any = '';

	constructor(private _cfr: ComponentFactoryResolver, private modalService: NgbModal) {}
	ngOnInit(): void {}
	ngAfterViewInit(): void {}

	imageCropped(event: ImageCroppedEvent) {
    // Stavio null kao id za product icon
		this.images.push(new ProductIcon(null , event.base64, 0));
	}

	resizeImage(imageBase64: string) {
		if(imageBase64 !== '') {
			this.cropperImageBase64 = imageBase64;
			this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static'});
		}
	}

  	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.images, event.previousIndex, event.currentIndex);
		//this.changeImageOrder();
	}

	addImage() {
		var component = this._cfr.resolveComponentFactory(ImageInputComponent);
		var createdComponent = this.container.createComponent(component);
		createdComponent.instance._parent = this;
		createdComponent.changeDetectorRef.detectChanges();
		createdComponent.instance.openFileSelectDialog();
	}

	removeImage(image: ProductIcon) {
		const index = this.images.indexOf(image)
		if(index > -1) {
			this.images.splice(index, 1);
		}
	}
}
