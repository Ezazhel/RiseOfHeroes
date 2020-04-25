import { GameStateInventoryRemoveItemAction } from "@core/models/game-state/game-state.action";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { AppState } from "@core/models";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
@Component({
    selector: "app-inventory-slot-item",
    templateUrl: "./inventory-slot-item.component.html",
    styleUrls: ["./inventory-slot-item.component.scss"],
})
export class InventorySlotItemComponent implements OnInit {
    @Input() item: ITemplateBaseItem;
    @Input() index: number;
    @Input() selling: boolean;
    @Output() itemHover = new EventEmitter<ITemplateBaseItem>();
    @Output() sellThrow = new EventEmitter<ITemplateBaseItem>();

    style: string;
    descriptionDisplay: string;
    delayedAction: number;
    actionDisplay: string;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.style = this.item.icon;
    }
    onMouseEnter() {
        this.itemHover.emit(this.item);
    }
    onMouseLeave() {
        this.itemHover.emit(null);
    }

    sellOrThrow() {
        this.sellThrow.emit(this.item);
    }
    equipItem() {
        //this.InventoryService.equip(this.item);
    }
}
