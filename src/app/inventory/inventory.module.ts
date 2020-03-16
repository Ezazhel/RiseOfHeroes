import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.InventoryComponent]
})
export class InventoryModule {}
