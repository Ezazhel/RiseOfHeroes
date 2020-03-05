import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitBarsHealthComponent } from './hud-portrait-bars-health.component';

describe('HudPortraitBarsHealthComponent', () => {
  let component: HudPortraitBarsHealthComponent;
  let fixture: ComponentFixture<HudPortraitBarsHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitBarsHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitBarsHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
