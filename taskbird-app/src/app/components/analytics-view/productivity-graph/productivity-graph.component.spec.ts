import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityGraphComponent } from './productivity-graph.component';

describe('ProductivityGraphComponent', () => {
  let component: ProductivityGraphComponent;
  let fixture: ComponentFixture<ProductivityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductivityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductivityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
