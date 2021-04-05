import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsHeaderComponent } from './esports-header.component';

describe('EsportsHeaderComponent', () => {
    let component: EsportsHeaderComponent;
    let fixture: ComponentFixture<EsportsHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EsportsHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EsportsHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
