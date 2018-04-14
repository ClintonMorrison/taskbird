import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectButtonComponent } from './delete-project-button.component';

describe('DeleteProjectButtonComponent', () => {
  let component: DeleteProjectButtonComponent;
  let fixture: ComponentFixture<DeleteProjectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProjectButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
