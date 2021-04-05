import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwappableImageComponent } from './swappable-image.component';

describe('SwappableImageComponent', () => {
    let component: SwappableImageComponent;
    let fixture: ComponentFixture<SwappableImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SwappableImageComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwappableImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
