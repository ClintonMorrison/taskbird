import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDimmerComponent } from './loading-dimmer.component';

describe('LoadingDimmerComponent', () => {
  let component: LoadingDimmerComponent;
  let fixture: ComponentFixture<LoadingDimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
