import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCheckboxComponent } from './task-checkbox.component';

describe('TaskCheckboxComponent', () => {
  let component: TaskCheckboxComponent;
  let fixture: ComponentFixture<TaskCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
