import { CombatPortraitComponent } from "./combat-portrait/combat-portrait.component";
import { CombatComponent } from "./combat/combat.component";
import { CombatHeroHudComponent } from "./combat-hero-hud/combat-hero-hud.component";
import { CombatMonsterHudComponent } from "./combat-monster-hud/combat-monster-hud.component";
import { CombatSpellCooldownComponent } from "./combat-hero-hud/combat-spell-cooldown/combat-spell-cooldown.component";

export const components: any[] = [
    CombatComponent,
    CombatPortraitComponent,
    CombatHeroHudComponent,
    CombatMonsterHudComponent,
    CombatSpellCooldownComponent,
];

export * from "./combat/combat.component";
export * from "./combat-portrait/combat-portrait.component";
