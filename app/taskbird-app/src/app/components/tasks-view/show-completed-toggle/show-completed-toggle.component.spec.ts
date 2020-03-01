import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompletedToggleComponent } from './show-completed-toggle.component';

describe('ShowCompletedToggleComponent', () => {
  let component: ShowCompletedToggleComponent;
  let fixture: ComponentFixture<ShowCompletedToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCompletedToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCompletedToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
