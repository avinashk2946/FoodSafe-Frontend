import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialTableComponent } from './raw-material-table.component';

describe('RawMaterialTableComponent', () => {
  let component: RawMaterialTableComponent;
  let fixture: ComponentFixture<RawMaterialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
