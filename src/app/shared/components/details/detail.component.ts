import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";
import { getDescription } from "@core/models/potions/potions.utils";
import { Potion } from "@core/models/potions/potions.model";

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
    @Input("item") set item(value: ITemplateBaseItem) {
        if (value === undefined || value === null) return;
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
    _item: ITemplateBaseItem;
    consumable: Potion;
    equipment: ITemplateWeapon | ITemplateArmor;

    getDescription(item: ITemplateBaseItem) {
        return getDescription(item as Potion);
    }
    constructor() {}

    ngOnInit(): void {}
}
