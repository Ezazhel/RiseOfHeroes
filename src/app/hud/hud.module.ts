import { InventoryModule } from "./../inventory/inventory.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule, InventoryModule],
    exports: [fromComponents.HudComponent]
})
export class HudModule {}
