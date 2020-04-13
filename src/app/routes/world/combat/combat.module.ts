import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "../combat/components";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.CombatComponent],
})
export class CombatModule {}
