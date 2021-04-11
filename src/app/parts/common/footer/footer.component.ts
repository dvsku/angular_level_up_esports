import { Component } from '@angular/core';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
    faInstagram = faInstagram;
    faFacebook = faFacebookSquare;
}
