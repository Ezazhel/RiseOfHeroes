import { InventoryModule } from "app/inventory/inventory.module";
import { CharacterModule } from "app/character/character.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";
import { SharedModule } from "@shared/shared.module";
import { MapModule } from "app/map/map.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [
        CommonModule,
        SharedModule,
        InventoryModule,
        CharacterModule,
        MapModule,
    ],
    exports: [fromComponents.HudComponent],
})
export class HudModule {}
