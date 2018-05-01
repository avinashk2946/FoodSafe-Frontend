import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightCheckComponent } from './weight-check.component';

describe('ReturnsComponent', () => {
  let component: WeightCheckComponent;
  let fixture: ComponentFixture<WeightCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
