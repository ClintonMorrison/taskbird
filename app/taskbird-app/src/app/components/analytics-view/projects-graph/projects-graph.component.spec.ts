import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsGraphComponent } from './projects-graph.component';

describe('ProjectsGraphComponent', () => {
  let component: ProjectsGraphComponent;
  let fixture: ComponentFixture<ProjectsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
