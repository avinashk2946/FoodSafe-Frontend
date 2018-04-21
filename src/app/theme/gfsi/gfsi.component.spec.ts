import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GfsiComponent } from './gfsi.component';

describe('GfsiComponent', () => {
  let component: GfsiComponent;
  let fixture: ComponentFixture<GfsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GfsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
