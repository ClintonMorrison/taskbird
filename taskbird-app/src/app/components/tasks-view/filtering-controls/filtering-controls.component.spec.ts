import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringControlsComponent } from './filtering-controls.component';

describe('FilteringControlsComponent', () => {
  let component: FilteringControlsComponent;
  let fixture: ComponentFixture<FilteringControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteringControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
