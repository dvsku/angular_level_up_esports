import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEsportsProductComponent } from './add-esports-product.component';

describe('AddEsportsProductComponent', () => {
    let component: AddEsportsProductComponent;
    let fixture: ComponentFixture<AddEsportsProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddEsportsProductComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEsportsProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
