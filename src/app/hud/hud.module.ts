import { InventoryModule } from "./../inventory/inventory.module";
import { CharacterModule } from "./../character/character.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule, InventoryModule, CharacterModule],
    exports: [fromComponents.HudComponent]
})
export class HudModule {}
