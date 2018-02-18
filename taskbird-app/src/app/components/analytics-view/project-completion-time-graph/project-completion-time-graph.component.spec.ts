import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletionTimeGraphComponent } from './project-completion-time-graph.component';

describe('ProjectCompletionTimeGraphComponent', () => {
  let component: ProjectCompletionTimeGraphComponent;
  let fixture: ComponentFixture<ProjectCompletionTimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCompletionTimeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCompletionTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
