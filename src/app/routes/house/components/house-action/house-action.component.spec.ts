import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseActionComponent } from './house-action.component';

describe('HouseActionComponent', () => {
  let component: HouseActionComponent;
  let fixture: ComponentFixture<HouseActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
