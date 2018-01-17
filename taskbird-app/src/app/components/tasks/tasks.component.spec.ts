import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tasks } from './tasks.component';

describe('Tasks', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tasks ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
