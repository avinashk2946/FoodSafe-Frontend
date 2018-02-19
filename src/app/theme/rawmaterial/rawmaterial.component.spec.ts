import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialComponent } from './rawmaterial.component';

describe('RawmaterialComponent', () => {
  let component: RawmaterialComponent;
  let fixture: ComponentFixture<RawmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
