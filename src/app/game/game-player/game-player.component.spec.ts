import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayerComponent } from './game-player.component';

describe('GamePlayerComponent', () => {
  let component: GamePlayerComponent;
  let fixture: ComponentFixture<GamePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
