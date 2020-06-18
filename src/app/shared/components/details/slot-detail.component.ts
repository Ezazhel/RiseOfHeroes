import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "slot-detail",
    template: ` <ng-container *transloco="let t">
        <div fxLayout="row" fxLayoutAlign="center center">
            <detail [item]="item"></detail>
            <detail
                *ngIf="itemEquipped"
                [item]="itemEquipped"
                [equipped]="true"
            ></detail>
        </div>
    </ng-container>`,
})
export class SlotDetailComponent implements OnInit {
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
