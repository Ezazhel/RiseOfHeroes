import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateItem,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-inventory-slot-detail",
    templateUrl: "./inventory-slot-detail.component.html",
    styleUrls: ["./inventory-slot-detail.component.scss"],
})
export class InventorySlotDetailComponent implements OnInit {
    @Input("item") set item(value: ITemplateBaseItem) {
        if (value === undefined) return;
        if (value.type === "item") {
            this.consumable = value as ITemplateItem;
        } else {
            this.equipment = value as ITemplateWeapon | ITemplateArmor;
        }
        this._item = value;
    }
    get item(): ITemplateBaseItem {
        return this._item;
    }
    _item: ITemplateBaseItem;
    consumable: ITemplateItem;
    equipment: ITemplateWeapon | ITemplateArmor;
    constructor() {}

    ngOnInit(): void {}
}
