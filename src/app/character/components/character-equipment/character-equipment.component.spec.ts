import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEquipmentComponent } from './character-equipment.component';

describe('CharacterEquipmentComponent', () => {
  let component: CharacterEquipmentComponent;
  let fixture: ComponentFixture<CharacterEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
