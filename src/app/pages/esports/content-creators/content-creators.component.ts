import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentCreator } from 'src/app/models/ContentCreator';
import { ContentCreatorService } from 'src/app/services/content-creator.service';

@Component({
    selector: 'app-content-creators',
    templateUrl: './content-creators.component.html',
    styleUrls: ['./content-creators.component.sass']
})
export class ContentCreatorsComponent implements OnInit, OnDestroy {
    creators: ContentCreator[];
    private creatorsSubscripton: Subscription;

    constructor(private creatorService: ContentCreatorService) {}

    ngOnInit(): void {
        this.creatorsSubscripton = this.creatorService.getContentCreators().subscribe((creators) => {
            this.creators = creators;
        });
    }

    ngOnDestroy(): void {
        if (this.creatorsSubscripton) this.creatorsSubscripton.unsubscribe();
    }
}
