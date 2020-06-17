import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateItem,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input, ViewChild } from "@angular/core";

@Component({
    selector: "app-inventory-slot-detail",
    templateUrl: "./inventory-slot-detail.component.html",
    styleUrls: ["./inventory-slot-detail.component.scss"],
})
export class InventorySlotDetailComponent implements OnInit {
    @Input("item") set item(value: ITemplateBaseItem) {
        if (value === undefined) return;
        this._item = value;
    }
    get item(): ITemplateBaseItem {
        return this._item;
    }
    @Input("itemEquipped") set itemEquipped(value: ITemplateBaseItem) {
        if (value === undefined || value === null) return;
        this._itemEquipped = value;
    }
    get itemEquipped(): ITemplateBaseItem {
        return this._itemEquipped;
    }
    _item: ITemplateBaseItem;
    _itemEquipped: ITemplateBaseItem;
    constructor() {}

    ngOnInit(): void {}
}
