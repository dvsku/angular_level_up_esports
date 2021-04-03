import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-swappable-image',
  templateUrl: './swappable-image.component.html',
  styleUrls: ['./swappable-image.component.sass']
})
export class SwappableImageComponent implements OnInit {
	@Input("firstSrc")
	firstSource: string = '';

	@Input("secondSrc")
	secondSource: string = '';

	currentSource: string

  	constructor() { }

	onMouseEnter() {
		if(this.currentSource !== this.secondSource && this.secondSource !== '') {
			this.currentSource = this.secondSource;
		}
	}

	onMouseLeave() {
		if(this.currentSource !== this.firstSource && this.firstSource !== '') {
			this.currentSource = this.firstSource;
		}
	}

	ngOnInit(): void {
		if(this.firstSource !== '')
			this.currentSource = this.firstSource;
		else
			this.currentSource = this.secondSource;
	}
}
