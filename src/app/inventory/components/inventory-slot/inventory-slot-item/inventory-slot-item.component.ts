import { update } from "@core/models/utils";
import {
    Stat,
    ITemplateBaseEquipment,
    ITemplateArmor,
    ITemplateWeapon,
} from "./../../../../core/models/game-data/game-data.model";
import {
    GameStateInventoryRemoveItemAction,
    GameStateEquipItemHeroAction,
    GameStateInventoryAddItemAction,
    GameStateUpdateHeroAction,
    GameStateUnEquipItemHeroAction,
} from "@core/models/game-state/game-state.action";
import {
    ITemplateBaseItem,
    ArmorCategory,
} from "@core/models/game-data/game-data.model";
import { AppState } from "@core/models";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { heroSelector } from "@core/models/selector";
import { first } from "rxjs/operators";
import { Potion } from "@core/models/potions/potions.model";
import { NotifierService } from "@core/services/notifier.service";
import { findEquipment } from "@core/models/entity/entity.utils";
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
    hero$ = this.store.select(heroSelector);
    style: string;
    descriptionDisplay: string;
    delayedAction: number;
    actionDisplay: string;
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {
        this.style = this.item.icon;
    }

    sellOrThrow() {
        this.itemHover.emit(null);
        this.sellThrow.emit(this.item);
    }
    equipItem() {
        this.store
            .select(heroSelector)
            .pipe(first())
            .subscribe((hero) => {
                if (hero.hp != hero.maxHp) return;

                const heroItem =
                    this.item.type != "item"
                        ? this.item.type === "armor"
                            ? findEquipment(hero, "armor", this.item.subType)
                            : findEquipment(hero, "weapon")
                        : findEquipment(hero, "item");
                if (heroItem !== undefined && heroItem.id !== "null") {
                    this.store.dispatch(
                        new GameStateUnEquipItemHeroAction(heroItem)
                    );
                }

                this.store.dispatch(
                    new GameStateEquipItemHeroAction(this.item)
                );
                this.itemHover.emit(null);
            });
    }
}
