import { Component, Input } from '@angular/core';
import { faFacebookSquare, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import { TeamMember } from 'src/app/models/TeamMember';
import { ImagesService } from 'src/app/services/images.service';

@Component({
    selector: 'card-team-member',
    templateUrl: './card-team-member.component.html',
    styleUrls: ['./card-team-member.component.sass']
})
export class CardTeamMemberComponent {
    @Input()
    teamMember: TeamMember;

    faInstagram = faInstagram;
    faTwitch = faTwitch;
    faTrovo = faStream;
    faFacebook = faFacebookSquare;
    faYouTube = faYoutube;
    faTwitter = faTwitter;

    constructor(public imageService: ImagesService) {}
}
