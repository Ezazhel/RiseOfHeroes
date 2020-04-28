import { InventorySlotItemComponent } from "./inventory-slot/inventory-slot-item/inventory-slot-item.component";
import { InventorySlotComponent } from "./inventory-slot/inventory-slot.component";
import { InventoryComponent } from "./inventory/inventory.component";

export const components: any[] = [
    InventoryComponent,
    InventorySlotComponent,
    InventorySlotItemComponent,
];

export * from "./inventory-slot/inventory-slot-item/inventory-slot-item.component";
export * from "./inventory-slot/inventory-slot.component";
export * from "./inventory/inventory.component";
