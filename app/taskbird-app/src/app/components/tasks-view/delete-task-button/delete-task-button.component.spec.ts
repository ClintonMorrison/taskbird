import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskButtonComponent } from './delete-task-button.component';

describe('DeleteTaskButtonComponent', () => {
  let component: DeleteTaskButtonComponent;
  let fixture: ComponentFixture<DeleteTaskButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTaskButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
