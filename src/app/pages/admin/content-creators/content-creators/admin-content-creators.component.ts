import { Component, OnDestroy, OnInit } from '@angular/core';
import { faAngleDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContentCreator } from 'src/app/models/ContentCreator';
import { ContentCreatorService } from 'src/app/services/content-creator.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-admin-content-creators',
    templateUrl: './admin-content-creators.component.html',
    styleUrls: ['./admin-content-creators.component.sass']
})
export class AdminContentCreatorsComponent implements OnInit, OnDestroy {
    creators: ContentCreator[];
    selectedCreator: ContentCreator;
    private creatorsSubscription: Subscription;

    faArrowDown = faAngleDown;
    faInfo = faInfo;

    constructor(
        private creatorService: ContentCreatorService,
        private toastrService: ToastrService,
        private modalService: NgbModal,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.creatorsSubscription = this.creatorService.getContentCreators().subscribe((creators) => {
            this.creators = creators;
        });
    }

    ngOnDestroy(): void {
        if (this.creatorsSubscription) this.creatorsSubscription.unsubscribe();
    }

    showModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onRemoveOk(): void {
        if (this.selectedCreator !== undefined && this.selectedCreator !== null) {
            this.creatorService.removeContentCreator(this.selectedCreator.id).then(
                (success) => {
                    if (success) {
                        this.toastrService.success('Content creator removed.');
                    } else {
                        this.toastrService.error('Failed to remove content creator.');
                    }
                },
                () => {
                    this.toastrService.error('Failed to remove content creator.');
                }
            );
        }
    }
}
