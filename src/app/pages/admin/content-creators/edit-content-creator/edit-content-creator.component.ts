import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentCreator } from 'src/app/models/ContentCreator';
import { ContentCreatorService } from 'src/app/services/content-creator.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'app-edit-content-creator',
    templateUrl: '../add-content-creator/add-content-creator.component.html',
    styleUrls: ['../add-content-creator/add-content-creator.component.sass']
})
export class EditContentCreatorComponent implements OnInit {
    creator: ContentCreator = new ContentCreator();
    title = 'Edit Content Creator';

    constructor(
        private creatorService: ContentCreatorService,
        private router: Router,
        private toastrService: ToastrService,
        private activatedRoute: ActivatedRoute,
        public imagesService: ImagesService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data: { contentCreator: ContentCreator }) => {
            if (data.contentCreator === undefined || data.contentCreator === null) {
                this.router.navigate(['/esports']);
                return;
            } else {
                this.creator = data.contentCreator;
            }
        });
    }

    onSubmit(): void {
        this.creatorService.updateContentCreator(this.creator).then(
            (success) => {
                if (success) {
                    this.router
                        .navigate(['/admin/dashboard', { outlets: { adminOutlet: 'content-creators' } }], {
                            skipLocationChange: true
                        })
                        .then(() => {
                            this.toastrService.success('Content creator updated.');
                        });
                } else {
                    this.toastrService.error('Failed to update content creator.');
                }
            },
            () => {
                this.toastrService.error('Failed to update content creator.');
            }
        );
    }
}
