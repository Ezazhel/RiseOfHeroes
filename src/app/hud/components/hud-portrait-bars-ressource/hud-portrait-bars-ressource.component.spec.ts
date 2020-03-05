import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitBarsRessourceComponent } from './hud-portrait-bars-ressource.component';

describe('HudPortraitBarsRessourceComponent', () => {
  let component: HudPortraitBarsRessourceComponent;
  let fixture: ComponentFixture<HudPortraitBarsRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitBarsRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitBarsRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
