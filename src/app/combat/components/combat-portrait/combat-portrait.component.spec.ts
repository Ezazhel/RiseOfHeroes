import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatPortraitComponent } from './combat-portrait.component';

describe('CombatPortraitComponent', () => {
  let component: CombatPortraitComponent;
  let fixture: ComponentFixture<CombatPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
