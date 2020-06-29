import {
    ITemplateBaseItem,
    ITemplateWeapon,
    ITemplateArmor,
    StatChange,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "slot-detail",
    template: ` <ng-container *transloco="let t">
        <div
            fxLayout="row"
            fxLayoutAlign="center center"
            *ngIf="item !== undefined"
        >
            <detail
                [item]="item"
                [compare]="getStatDifference()"
                [comparaison]="compare"
            ></detail>
            <detail
                *ngIf="itemEquipped"
                [item]="itemEquipped"
                [equipped]="true"
            ></detail>
        </div>
    </ng-container>`,
})
export class SlotDetailComponent implements OnInit {
    @Output() clickEvent = new EventEmitter();
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
    @Input() compare: boolean;
    get itemEquipped(): ITemplateBaseItem {
        return this._itemEquipped;
    }
    _item: ITemplateBaseItem;
    _itemEquipped: ITemplateBaseItem;

    getStatDifference(): StatChange {
        let change: StatChange = {};
        if (this._item.type === undefined || this._item.type == "item")
            return undefined;
        let equipment = this._item as ITemplateWeapon | ITemplateArmor;
        change.armor =
            this._itemEquipped !== undefined && this._item.type == "armor"
                ? (equipment as ITemplateArmor).armor -
                  (this._itemEquipped as ITemplateArmor).armor
                : this._item.type == "weapon"
                ? 0
                : (this._item as ITemplateArmor).armor;
        change.stats =
            this._itemEquipped !== undefined
                ? [...equipment.stats].map((s, index) => {
                      return {
                          ...s,
                          value:
                              s.value -
                              (this._itemEquipped as
                                  | ITemplateWeapon
                                  | ITemplateArmor).stats[index].value,
                      };
                  })
                : [...equipment.stats];
        return change;
    }
    constructor() {}

    ngOnInit(): void {}
}
