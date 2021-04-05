import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsFooterComponent } from './esports-footer.component';

describe('EsportsFooterComponent', () => {
    let component: EsportsFooterComponent;
    let fixture: ComponentFixture<EsportsFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EsportsFooterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EsportsFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
