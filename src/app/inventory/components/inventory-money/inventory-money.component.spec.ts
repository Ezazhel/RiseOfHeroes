import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMoneyComponent } from './inventory-money.component';

describe('InventoryMoneyComponent', () => {
  let component: InventoryMoneyComponent;
  let fixture: ComponentFixture<InventoryMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
