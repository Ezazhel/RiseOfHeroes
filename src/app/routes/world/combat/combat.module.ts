import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "../combat/components";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";
import { CombatHeroHudComponent } from './components/combat-hero-hud/combat-hero-hud.component';
import { CombatMonsterHudComponent } from './components/combat-monster-hud/combat-monster-hud.component';

@NgModule({
    declarations: [fromComponents.components, CombatHeroHudComponent, CombatMonsterHudComponent],
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
