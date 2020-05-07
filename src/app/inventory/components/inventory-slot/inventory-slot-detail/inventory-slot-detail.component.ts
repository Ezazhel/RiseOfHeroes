import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-inventory-slot-detail",
    templateUrl: "./inventory-slot-detail.component.html",
    styleUrls: ["./inventory-slot-detail.component.scss"],
})
export class InventorySlotDetailComponent implements OnInit {
    @Input() item: ITemplateBaseItem;
    constructor() {}

    ngOnInit(): void {}
}
