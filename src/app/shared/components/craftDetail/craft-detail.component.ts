import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "craft-detail",
    templateUrl: "./craft-detail.component.html",
    styleUrls: ["./craft-detail.component.scss"],
})
export class CraftDetailComponent implements OnInit {
    @Input() set itemEquipped(value: ITemplateBaseItem) {
        if (value === undefined || value === null) return;
        this._itemEquipped = value;
    }
    get itemEquipped(): ITemplateBaseItem {
        return this._itemEquipped;
    }
    @Input() materials: Currency[];
    _itemEquipped: ITemplateBaseItem;
    constructor() {}

    ngOnInit(): void {}
}
