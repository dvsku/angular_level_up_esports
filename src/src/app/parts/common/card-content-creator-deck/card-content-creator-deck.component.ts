import { Component, Input } from '@angular/core';
import { ContentCreator } from 'src/app/models/ContentCreator';

@Component({
    selector: 'card-content-creator-deck',
    templateUrl: './card-content-creator-deck.component.html',
    styleUrls: ['./card-content-creator-deck.component.sass']
})
export class CardContentCreatorDeckComponent {
    @Input('creators')
    creators: ContentCreator[];
}
