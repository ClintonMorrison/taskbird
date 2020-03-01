import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProjectViewerComponent } from './active-project-viewer.component';

describe('ActiveProjectViewerComponent', () => {
  let component: ActiveProjectViewerComponent;
  let fixture: ComponentFixture<ActiveProjectViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProjectViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
