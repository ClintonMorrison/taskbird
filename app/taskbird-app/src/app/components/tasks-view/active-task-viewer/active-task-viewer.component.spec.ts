import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTaskViewerComponent } from './active-task-viewer.component';

describe('ActiveTaskViewerComponent', () => {
  let component: ActiveTaskViewerComponent;
  let fixture: ComponentFixture<ActiveTaskViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTaskViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTaskViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
