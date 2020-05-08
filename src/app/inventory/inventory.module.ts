import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";
import { InventorySlotDetailComponent } from './components/inventory-slot/inventory-slot-detail/inventory-slot-detail.component';

@NgModule({
    declarations: [fromComponents.components, InventorySlotDetailComponent],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.components],
})
export class InventoryModule {}
