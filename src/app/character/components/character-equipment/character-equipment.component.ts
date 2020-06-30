import { findEquipment } from "@core/models/entity/entity.utils";
import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "@core/models/entity/entity";
import { Potion } from "@core/models/potions/potions.model";
import {
    WeaponCategory,
    ArmorCategory,
    ItemCategories,
    ITemplateBaseEquipment,
} from "@core/models/game-data/game-data.model";

@Component({
    selector: "app-character-equipment",
    templateUrl: "./character-equipment.component.html",
    styleUrls: ["./character-equipment.component.scss"],
})
export class CharacterEquipmentComponent implements OnInit {
    @Input() hero: Hero;

    findEquipment(
        type: ItemCategories,
        subType: WeaponCategory | ArmorCategory
    ) {
        return type === "armor"
            ? findEquipment(this.hero, "armor", subType as ArmorCategory)
            : findEquipment(this.hero, "weapon", subType as WeaponCategory);
    }

    trackByFn(index: number, el: ITemplateBaseEquipment) {
        return el;
    }
    constructor() {}

    ngOnInit(): void {}
}
