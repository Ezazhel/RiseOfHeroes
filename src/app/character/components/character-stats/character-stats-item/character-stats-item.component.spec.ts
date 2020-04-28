import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatsItemComponent } from './character-stats-item.component';

describe('CharacterStatsItemComponent', () => {
  let component: CharacterStatsItemComponent;
  let fixture: ComponentFixture<CharacterStatsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterStatsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStatsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
