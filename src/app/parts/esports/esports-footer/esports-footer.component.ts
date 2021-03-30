import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-esports-footer',
  templateUrl: './esports-footer.component.html',
  styleUrls: ['./esports-footer.component.sass']
})
export class EsportsFooterComponent implements OnInit {

  faInstagram = faInstagram;
  faFacebook = faFacebookSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
