import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayTitleComponent } from './weekday-title.component';

describe('WeekdayTitleComponent', () => {
  let component: WeekdayTitleComponent;
  let fixture: ComponentFixture<WeekdayTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekdayTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdayTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
