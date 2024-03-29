import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-swappable-image',
    templateUrl: './swappable-image.component.html',
    styleUrls: ['./swappable-image.component.sass']
})
export class SwappableImageComponent implements OnInit {
    @Input('firstSrc')
    firstSource = '';

    @Input('secondSrc')
    secondSource = '';

    @Input('href')
    href = '';

    @Input('additionalClasses')
    classes = 'swappable-image';

    currentSource: string;

    onMouseEnter(): void {
        if (this.currentSource !== this.secondSource && this.secondSource !== '') {
            this.currentSource = this.secondSource;
        }
    }

    onMouseLeave(): void {
        if (this.currentSource !== this.firstSource && this.firstSource !== '') {
            this.currentSource = this.firstSource;
        }
    }

    ngOnInit(): void {
        if (this.firstSource !== '') {
            this.currentSource = this.firstSource;
        } else if (this.secondSource !== '') {
            this.currentSource = this.secondSource;
        } else {
            ('');
        }
    }
}
