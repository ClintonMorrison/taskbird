import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSidebarComponent } from './task-sidebar.component';

describe('TaskSidebarComponent', () => {
  let component: TaskSidebarComponent;
  let fixture: ComponentFixture<TaskSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
