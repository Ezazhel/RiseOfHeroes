import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitBarsComponent } from './hud-portrait-bars.component';

describe('HudPortraitBarsComponent', () => {
  let component: HudPortraitBarsComponent;
  let fixture: ComponentFixture<HudPortraitBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
