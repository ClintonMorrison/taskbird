import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeadingComponent } from './project-heading.component';

describe('ProjectHeadingComponent', () => {
  let component: ProjectHeadingComponent;
  let fixture: ComponentFixture<ProjectHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
