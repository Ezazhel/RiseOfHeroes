import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySlotItemComponent } from './inventory-slot-item.component';

describe('InventorySlotItemComponent', () => {
  let component: InventorySlotItemComponent;
  let fixture: ComponentFixture<InventorySlotItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySlotItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySlotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
