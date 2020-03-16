import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySlotComponent } from './inventory-slot.component';

describe('InventorySlotComponent', () => {
  let component: InventorySlotComponent;
  let fixture: ComponentFixture<InventorySlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
