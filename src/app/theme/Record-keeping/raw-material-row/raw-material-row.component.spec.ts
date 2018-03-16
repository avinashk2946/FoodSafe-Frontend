import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialRowComponent } from './raw-material-row.component';

describe('RawMaterialRowComponent', () => {
  let component: RawMaterialRowComponent;
  let fixture: ComponentFixture<RawMaterialRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
