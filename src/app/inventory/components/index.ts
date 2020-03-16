import { InventorySlotItemComponent } from "./inventory-slot/inventory-slot-item/inventory-slot-item.component";
import { InventorySlotComponent } from "./inventory-slot/inventory-slot.component";
import { InventoryMoneyComponent } from "./inventory-money/inventory-money.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { InventoryFilterComponent } from "./inventory-filter/inventory-filter.component";
export const components: any[] = [
    InventoryComponent,
    InventoryMoneyComponent,
    InventorySlotComponent,
    InventorySlotItemComponent,
    InventoryFilterComponent
];

export * from "./inventory-slot/inventory-slot-item/inventory-slot-item.component";
export * from "./inventory-slot/inventory-slot.component";
export * from "./inventory-money/inventory-money.component";
export * from "./inventory/inventory.component";
export * from "./inventory-filter/inventory-filter.component";
