import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductIcon } from 'src/app/models/ProductIcon';
import { ProductInfo } from 'src/app/models/ProductInfo';
import { ImagesFormGroupComponent } from 'src/app/parts/common/images-form-group/images-form-group.component';

@Component({
  selector: 'app-add-esports-product',
  templateUrl: './add-esports-product.component.html',
  styleUrls: ['./add-esports-product.component.sass'],
})
export class AddEsportsProductComponent implements OnInit {
	product: ProductInfo

	@ViewChild(ImagesFormGroupComponent) 
	imagesFormGroup: ImagesFormGroupComponent;

	constructor(private config: NgbNavConfig) { 
		this.product = new ProductInfo();
		config.destroyOnHide = false;
	}

	ngOnInit(): void {

	}

	onSubmit(form) {
		console.log(form);
	}

	addImageInput() {
		this.imagesFormGroup.addImage();
	}

	

	public ngAfterViewInit(): void {
		//console.log(this.imagesFormGroup)
	}

}
