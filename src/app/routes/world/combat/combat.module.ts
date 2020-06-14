import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "../combat/components";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [fromComponents.components],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: "", component: fromComponents.CombatComponent },
        ]),
    ],
    exports: [fromComponents.CombatComponent],
})
export class CombatModule {}
