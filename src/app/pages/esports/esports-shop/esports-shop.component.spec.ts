import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EsportsShopComponent } from './esports-shop.component';

describe('EsportsShopComponent', () => {
    let component: EsportsShopComponent;
    let fixture: ComponentFixture<EsportsShopComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [EsportsShopComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EsportsShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
