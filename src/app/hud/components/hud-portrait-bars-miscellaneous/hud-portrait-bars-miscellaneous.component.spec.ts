import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitBarsMiscellaneousComponent } from './hud-portrait-bars-miscellaneous.component';

describe('HudPortraitBarsMiscellaneousComponent', () => {
  let component: HudPortraitBarsMiscellaneousComponent;
  let fixture: ComponentFixture<HudPortraitBarsMiscellaneousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitBarsMiscellaneousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitBarsMiscellaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
