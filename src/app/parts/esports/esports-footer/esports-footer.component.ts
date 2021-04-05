import { Component } from '@angular/core';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-esports-footer',
    templateUrl: './esports-footer.component.html',
    styleUrls: ['./esports-footer.component.sass']
})
export class EsportsFooterComponent {
    faInstagram = faInstagram;
    faFacebook = faFacebookSquare;
}
