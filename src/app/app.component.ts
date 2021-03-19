import { Component } from '@angular/core';
import { Achievement } from './models/Achievement';
import { ProductCatalog } from './models/ProductCatalog';
import { ProductIcon } from './models/ProductIcon';
import { TeamMember } from './models/TeamMember';
import { AchievementService } from './services/achievement.service';
import { ProductCatalogService } from './services/product-catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'lvl-front-final';

}
