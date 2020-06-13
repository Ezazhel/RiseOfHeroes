import { Stat } from "./../../../../core/models/game-data/game-data.model";
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
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { heroSelector } from "@core/models/selector";
import { first } from "rxjs/operators";
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
        this.itemHover.emit(null);
        this.sellThrow.emit(this.item);
    }
    equipItem() {
        this.store
            .select(heroSelector)
            .pipe(first())
            .subscribe((hero) => {
                let heroItem = null;
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
                    heroItem = hero.weapon;
                }
                if (heroItem !== undefined) {
                    this.store.dispatch(
                        new GameStateInventoryAddItemAction(heroItem)
                    );
                    let stats = [...hero.stats];
                    heroItem.stats.forEach((stat: Stat) => {
                        let indexStat = stats.findIndex(
                            (s) => s.type == stat.type
                        );
                        let hStat = stats[indexStat];
                        stats[indexStat] = {
                            ...hStat,
                            value: hStat.value - stat.value,
                        };
                    });
                    //Update Hero with removing stat
                    this.store.dispatch(
                        new GameStateUpdateHeroAction({
                            ...hero,
                            stats: stats,
                            armor: hero.armor - heroItem.armor,
                        })
                    );
                }
            });
        this.store.dispatch(new GameStateEquipItemHeroAction(this.item));
        this.store.dispatch(
            new GameStateInventoryRemoveItemAction(this.item.id)
        );
        this.itemHover.emit(null);
        //if hero have an item in slot, add item to inventory
    }
}
