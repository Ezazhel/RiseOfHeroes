import { CombatModule } from "app/combat/combat.module";
import { InventoryModule } from "app/inventory/inventory.module";
import { CharacterModule } from "app/character/character.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components/";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [
        CommonModule,
        SharedModule,
        InventoryModule,
        CharacterModule,
        CombatModule,
    ],
    exports: [fromComponents.HudComponent],
})
export class HudModule {}
