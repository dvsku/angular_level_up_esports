import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagesFormGroupComponent } from '../images-form-group/images-form-group.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductIcon } from 'src/app/models/ProductIcon';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.sass']
})
export class ImageInputComponent implements OnInit {
  _parent: ImagesFormGroupComponent;

  @ViewChild("fileInput")
  fileInput: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  openFileSelectDialog() {
    this.fileInput.nativeElement.click();
  }

  fileSelected(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this._parent.resizeImage(reader.result.toString());
    };
  }

  public ngAfterViewInit(): void {}
}
