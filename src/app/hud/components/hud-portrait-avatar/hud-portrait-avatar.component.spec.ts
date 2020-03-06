import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HudPortraitAvatarComponent } from './hud-portrait-avatar.component';

describe('HudPortraitAvatarComponent', () => {
  let component: HudPortraitAvatarComponent;
  let fixture: ComponentFixture<HudPortraitAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HudPortraitAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HudPortraitAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
