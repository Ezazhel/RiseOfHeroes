import { CharacterComponent } from "./character/character.component";
import { CharacterEquipmentComponent } from "./character-equipment/character-equipment.component";
import { CharacterStatsComponent } from "./character-stats/character-stats.component";

export const components: any[] = [
    CharacterComponent,
    CharacterEquipmentComponent,
    CharacterStatsComponent
];

export * from "./character/character.component";
export * from "./character-equipment/character-equipment.component";
export * from "./character-stats/character-stats.component";
