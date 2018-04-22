import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingProceduresComponent } from './operating-procedures.component';

describe('OperatingProceduresComponent', () => {
  let component: OperatingProceduresComponent;
  let fixture: ComponentFixture<OperatingProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
