import { GameStateInventoryRemoveItemAction } from "@core/models/game-state/game-state.action";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { AppState } from "@core/models";
import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
@Component({
    selector: "app-inventory-slot-item",
    templateUrl: "./inventory-slot-item.component.html",
    styleUrls: ["./inventory-slot-item.component.scss"],
})
export class InventorySlotItemComponent implements OnInit {
    @Input() item: ITemplateBaseItem;
    @Input() index: number;
    style: string;
    descriptionDisplay: string;
    delayedAction: number;
    actionDisplay: string;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.style = this.item.icon;
    }
    onMouseEnter() {
        this.descriptionDisplay = "block";
    }
    onMouseLeave() {
        this.descriptionDisplay = "none";
        this.hideAction();
    }
    displayAction() {
        if (this.delayedAction !== undefined) clearTimeout(this.delayedAction);
        this.actionDisplay = "flex";
    }
    hideAction() {
        this.delayedAction = window.setTimeout(
            () => (this.actionDisplay = "none"),
            100
        );
    }

    throwItem() {
        this.store.dispatch(
            new GameStateInventoryRemoveItemAction(this.item.id)
        );
    }
    equipItem() {
        //this.InventoryService.equip(this.item);
    }
}
