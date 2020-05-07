import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySlotDetailComponent } from './inventory-slot-detail.component';

describe('InventorySlotDetailComponent', () => {
  let component: InventorySlotDetailComponent;
  let fixture: ComponentFixture<InventorySlotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySlotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySlotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
