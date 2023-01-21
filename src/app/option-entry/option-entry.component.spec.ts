import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionEntryComponent } from './option-entry.component';

describe('OptionEntryComponent', () => {
    let component: OptionEntryComponent;
    let fixture: ComponentFixture<OptionEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ OptionEntryComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(OptionEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
