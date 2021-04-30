import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/models/Person';
import { ImagesService } from 'src/app/services/images.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-add-person',
    templateUrl: './add-person.component.html',
    styleUrls: ['./add-person.component.sass']
})
export class AddPersonComponent {
    person: Person = new Person();
    title = 'Add Person';

    @ViewChild('fileInput')
    fileInput: ElementRef;

    @ViewChild('modal')
    modal: ElementRef;

    faEyeSlash = faEyeSlash;
    faTimes = faTimes;

    cropperImageBase64 = '';
    croppedImage: any = '';

    constructor(
        private modalService: NgbModal,
        private personService: PersonService,
        private router: Router,
        private toastrService: ToastrService,
        public imagesService: ImagesService
    ) {}

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
        this.person.profilePicture = event.base64;
    }

    removeImage(): void {
        this.person.profilePicture = null;
    }

    onSubmit(): void {
        this.personService.createPerson(this.person).then(
            (success) => {
                if (success) {
                    this.toastrService.success('Person created.');
                } else {
                    this.toastrService.error('Failed to create person.');
                }
            },
            () => {
                this.toastrService.error('Failed to create person.');
            }
        );
    }
}
