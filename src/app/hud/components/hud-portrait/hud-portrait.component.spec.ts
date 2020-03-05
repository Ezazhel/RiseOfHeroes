import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitComponent } from './hud-portrait.component';

describe('HudPortraitComponent', () => {
  let component: HudPortraitComponent;
  let fixture: ComponentFixture<HudPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
