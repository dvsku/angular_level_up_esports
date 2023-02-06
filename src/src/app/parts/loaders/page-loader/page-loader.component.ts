import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { loaderFadeOut } from 'src/app/_animations/animations';

@Component({
    selector: 'page-loader',
    templateUrl: './page-loader.component.html',
    styleUrls: ['./page-loader.component.sass'],
    animations: [loaderFadeOut]
})
export class PageLoaderComponent {
    constructor(public loaderService: LoaderService) {}
}
