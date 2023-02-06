import { Component, Input } from '@angular/core';
import { ContentCreator } from 'src/app/models/ContentCreator';
import { ImagesService } from 'src/app/services/images.service';
import { faFacebookSquare, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStream } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'card-content-creator',
    templateUrl: './card-content-creator.component.html',
    styleUrls: ['./card-content-creator.component.sass']
})
export class CardContentCreatorComponent {
    @Input('creator')
    creator: ContentCreator;

    faInstagram = faInstagram;
    faTwitch = faTwitch;
    faTrovo = faStream;
    faFacebook = faFacebookSquare;
    faYouTube = faYoutube;
    faTwitter = faTwitter;

    constructor(public imageService: ImagesService) {}
}
