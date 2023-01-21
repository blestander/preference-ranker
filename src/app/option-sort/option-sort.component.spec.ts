import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSortComponent } from './option-sort.component';

describe('OptionSortComponent', () => {
    let component: OptionSortComponent;
    let fixture: ComponentFixture<OptionSortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ OptionSortComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(OptionSortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
