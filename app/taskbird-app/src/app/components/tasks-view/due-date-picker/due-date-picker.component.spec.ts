import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDatePickerComponent } from './due-date-picker.component';

describe('DueDatePickerComponent', () => {
  let component: DueDatePickerComponent;
  let fixture: ComponentFixture<DueDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
