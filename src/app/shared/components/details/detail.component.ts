import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateItem,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
    @Input("item") set item(value: ITemplateBaseItem) {
        if (value === undefined || value === null) return;
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
    @Input() equipped: boolean;
    _item: ITemplateBaseItem;
    consumable: ITemplateItem;
    equipment: ITemplateWeapon | ITemplateArmor;
    constructor() {}

    ngOnInit(): void {}
}
