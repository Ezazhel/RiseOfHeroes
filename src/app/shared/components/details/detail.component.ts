import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateBaseItem,
    Stat,
    StatChange,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";
import { getDescription } from "@core/models/potions/potions.utils";
import { Potion } from "@core/models/potions/potions.model";
import { Rune } from "@core/models/runes/runes.model";

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
    @Input("item") set item(value: ITemplateBaseItem) {
        if (value === undefined || value === null || value.type === undefined)
            return;
        if (value.type === "item") {
            this.consumable = value as Potion;
        } else {
            this.equipment = value as ITemplateWeapon | ITemplateArmor;
        }
        this._item = value;
    }
    get item(): ITemplateBaseItem {
        return this._item;
    }
    @Input() iconClass: string;
    @Input() equipped: boolean;
    @Input() compare: StatChange;
    @Input() comparaison: boolean;

    _item: ITemplateBaseItem;
    consumable: Potion;
    equipment: ITemplateWeapon | ITemplateArmor;

    getDescription(item: ITemplateBaseItem) {
        return getDescription(item as Potion);
    }
    trackByRune(index: number, el: Rune) {
        return el.type;
    }
    trackByStat(index: number, el: Stat) {
        return el.type;
    }
    trackByStatCompare(index: number, el: Stat) {
        return index;
    }
    constructor() {}

    ngOnInit(): void {}
}
