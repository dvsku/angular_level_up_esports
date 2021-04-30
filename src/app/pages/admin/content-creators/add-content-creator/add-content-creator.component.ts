import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentCreator } from 'src/app/models/ContentCreator';
import { ContentCreatorService } from 'src/app/services/content-creator.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-add-content-creator',
    templateUrl: './add-content-creator.component.html',
    styleUrls: ['./add-content-creator.component.sass']
})
export class AddContentCreatorComponent {
    creator: ContentCreator = new ContentCreator();
    title = 'Add Content Creator';

    constructor(
        private creatorService: ContentCreatorService,
        private router: Router,
        private toastrService: ToastrService,
        public imagesService: ImagesService
    ) {}

    onSubmit(): void {
        this.creatorService.createContentCreator(this.creator).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'content-creators' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Content creator created.');
                        });
                } else {
                    this.toastrService.error('Failed to create content creator.');
                }
            },
            () => {
                this.toastrService.error('Failed to create content creator.');
            }
        );
    }
}
