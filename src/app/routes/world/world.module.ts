import { RouterModule } from "@angular/router";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: "city",
                loadChildren: () =>
                    import("./city/city.module").then((m) => m.CityModule),
            },
            {
                path: "combat/:monster",
                loadChildren: () =>
                    import("./combat/combat.module").then(
                        (m) => m.CombatModule
                    ),
            },
        ]),
    ],
})
export class WorldModule {}
