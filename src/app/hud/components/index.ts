import { HudComponent } from "./hud/hud.component";
import { HudPortraitComponent } from "./hud-portrait/hud-portrait.component";
import { HudPortraitBarsComponent } from "./hud-portrait-bars/hud-portrait-bars.component";
import { HudPortraitBarsHealthComponent } from "./hud-portrait-bars-health/hud-portrait-bars-health.component";
import { HudPortraitBarsMiscellaneousComponent } from "./hud-portrait-bars-miscellaneous/hud-portrait-bars-miscellaneous.component";
import { HudPortraitBarsRessourceComponent } from "./hud-portrait-bars-ressource/hud-portrait-bars-ressource.component";
import { HudPortraitAvatarComponent } from "./hud-portrait-avatar/hud-portrait-avatar.component";

export const components: any[] = [
    HudComponent,
    HudPortraitComponent,
    HudPortraitBarsComponent,
    HudPortraitBarsHealthComponent,
    HudPortraitBarsMiscellaneousComponent,
    HudPortraitBarsRessourceComponent,
    HudPortraitAvatarComponent
];

export * from "./hud/hud.component";
export * from "./hud-portrait/hud-portrait.component";
export * from "./hud-portrait-bars/hud-portrait-bars.component";
export * from "./hud-portrait-bars-health/hud-portrait-bars-health.component";
export * from "./hud-portrait-bars-miscellaneous/hud-portrait-bars-miscellaneous.component";
export * from "./hud-portrait-bars-ressource/hud-portrait-bars-ressource.component";
export * from "./hud-portrait-avatar/hud-portrait-avatar.component";
