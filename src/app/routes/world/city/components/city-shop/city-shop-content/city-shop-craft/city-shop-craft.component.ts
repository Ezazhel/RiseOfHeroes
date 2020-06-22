import { levelSelector } from "@core/models/selector";
import { currenciesSelector, equippedSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { Component, OnInit, Input } from "@angular/core";
import { Shop, Craft, CraftSet } from "@routes/world/city/store/cities.model";
import {
    ITemplateBaseItem,
    Currency,
    ITemplateBaseEquipmennt,
    ITemplateArmor,
} from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import {
    GameStateInventoryAddItemAction,
    GameStateCurrenciesAddCurrencyAction,
} from "@core/models/game-state/game-state.action";
import { modifyStat } from "@core/models/craft/craft.utils";
import { entityId } from "@core/models/utils";

@Component({
    selector: "app-city-shop-craft",
    templateUrl: "./city-shop-craft.component.html",
    styleUrls: ["./city-shop-craft.component.scss"],
})
export class CityShopCraftComponent implements OnInit {
    @Input() cityId: string;

    @Input("shop") set shop(value: Shop) {
        this._shop = value;
    }

    _shop: Shop;
    currency$: Observable<Currency[]> = this.store.select(currenciesSelector);
    level$ = this.store.select(levelSelector);
    canCraft(material: Currency[]): boolean {
        let currencies: Currency[];
        let canCraft: boolean = true;
        this.currency$.pipe(take(1)).subscribe((c) => (currencies = c));
        material.forEach((el) => {
            let currency = currencies.find((s) => s.name === el.name);
            if (currency === undefined) {
                canCraft = false;
                return;
            }
            if (currency.quantity < el.quantity) {
                canCraft = false;
            }
        });
        return canCraft;
    }
    craftItem(item: CraftSet): void {
        if (this.canCraft(item.materials)) {
            let equipment: ITemplateBaseEquipmennt = {
                ...item.equipment,
                id: entityId(item.equipment.name),
            };
            this.level$.pipe(take(1)).subscribe((l: number) => {
                equipment = {
                    ...equipment,
                    stats: equipment.stats.map((s) => ({
                        ...s,
                        value: modifyStat("legendary", s.value, l),
                    })),
                };
                if (equipment.type == "armor") {
                    (equipment as ITemplateArmor) = {
                        ...(equipment as ITemplateArmor),
                        armor: modifyStat(
                            "legendary",
                            (equipment as ITemplateArmor).armor,
                            l
                        ),
                    };
                }
            });

            this.store.dispatch(new GameStateInventoryAddItemAction(equipment));
            item.materials.forEach((el) => {
                this.store.dispatch(
                    new GameStateCurrenciesAddCurrencyAction({
                        ...el,
                        quantity: -1 * el.quantity,
                    })
                );
            });
        }
    }

    setWithStat(item: ITemplateBaseEquipmennt) {
        this.level$.pipe(take(1)).subscribe((l: number) => {
            item = {
                ...item,
                stats: item.stats.map((s) => ({
                    ...s,
                    value: modifyStat("legendary", s.value, l),
                })),
            };
            if (item.type == "armor") {
                (item as ITemplateArmor) = {
                    ...(item as ITemplateArmor),
                    armor: modifyStat(
                        "legendary",
                        (item as ITemplateArmor).armor,
                        l
                    ),
                };
            }
        });
        return item;
    }

    public equipped(item: ITemplateBaseItem) {
        let equipped: ITemplateBaseItem;
        this.store
            .select(equippedSelector(item?.type == "weapon", item?.subType))
            .pipe(take(1))
            .subscribe((i) => (equipped = i));
        return equipped;
    }
    trackByCraft(index: number, el: Craft) {
        return el;
    }
    trackByItem(index: number, el: ITemplateBaseItem) {
        return el;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
