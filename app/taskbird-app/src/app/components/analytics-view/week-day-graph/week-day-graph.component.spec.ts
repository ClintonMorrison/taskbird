import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayGraphComponent } from './week-day-graph.component';

describe('WeekDayGraphComponent', () => {
  let component: WeekDayGraphComponent;
  let fixture: ComponentFixture<WeekDayGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDayGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDayGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
