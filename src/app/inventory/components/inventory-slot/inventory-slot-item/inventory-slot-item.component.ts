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
                let heroItem: ITemplateArmor | ITemplateWeapon | Potion;
                if (this.item.type == "armor") {
                    switch (this.item.subType as ArmorCategory) {
                        case "chest":
                            heroItem = hero.chest;
                            break;
                        case "boots":
                            heroItem = hero.boots;
                            break;
                        case "gloves":
                            heroItem = hero.gloves;
                            break;
                        case "helmet":
                            heroItem = hero.helmet;
                            break;
                        case "pants":
                            heroItem = hero.pants;
                            break;
                    }
                } else if (this.item.type == "weapon") {
                    heroItem = hero.weapon as ITemplateWeapon;
                } else if (this.item.type == "item") {
                    heroItem = hero.potion as Potion;
                }
                if (heroItem !== undefined) {
                    this.store.dispatch(
                        new GameStateInventoryAddItemAction(heroItem)
                    );
                    if (heroItem.type == "armor" || heroItem.type == "weapon") {
                        let baseStats = [...hero.baseStats];
                        (heroItem as ITemplateBaseEquipment).stats.forEach(
                            (stat: Stat) => {
                                baseStats = update(
                                    baseStats,
                                    (s) => s.type == stat.type,
                                    (s: Stat) => ({
                                        ...s,
                                        value: s.value - stat.value,
                                    })
                                );
                            }
                        );
                        //Update Hero with removing stat
                        if (heroItem.type == "armor") {
                            this.store.dispatch(
                                new GameStateUpdateHeroAction({
                                    ...hero,
                                    baseStats,
                                    armor:
                                        hero.armor -
                                        (heroItem as ITemplateArmor).armor,
                                })
                            );
                        } else if (heroItem.type == "weapon") {
                            this.store.dispatch(
                                new GameStateUpdateHeroAction({
                                    ...hero,
                                    baseStats,
                                })
                            );
                        }
                    }
                }
                this.store.dispatch(
                    new GameStateEquipItemHeroAction(this.item)
                );
                this.store.dispatch(
                    new GameStateInventoryRemoveItemAction(this.item.id)
                );
                this.itemHover.emit(null);
            });
    }
}
