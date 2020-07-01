import { levelSelector, availableSlot } from "@core/models/selector";
import { currenciesSelector, equippedSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    ChangeDetectionStrategy,
} from "@angular/core";
import { Shop, Craft, CraftSet } from "@routes/world/city/store/cities.model";
import {
    ITemplateBaseItem,
    Currency,
    ITemplateBaseEquipment,
    ITemplateArmor,
    ITemplateWeapon,
    StatChange,
} from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { take, withLatestFrom } from "rxjs/operators";
import {
    GameStateInventoryAddItemAction,
    GameStateCurrenciesAddCurrencyAction,
} from "@core/models/game-state/game-state.action";
import { modifyStat, modifyPrice } from "@core/models/craft/craft.utils";
import { entityId } from "@core/models/utils";
import { toNumber } from "@ngneat/transloco";
import { NotifierService } from "@core/services/notifier.service";

@Component({
    selector: "app-city-shop-craft",
    templateUrl: "./city-shop-craft.component.html",
    styleUrls: ["./city-shop-craft.component.scss"],
})
export class CityShopCraftComponent implements OnInit, OnDestroy {
    @Input() cityId: string;

    @Input("shop") set shop(value: Shop) {
        this.level$.pipe(take(1)).subscribe((l: number) => {
            value = {
                ...value,
                crafts: [...value.crafts].map((c) => ({
                    ...c,
                    weaponArmor: [...c.weaponArmor].map((item) => {
                        return {
                            ...item,
                            equipment: this.setWithStat(item.equipment, l),
                        };
                    }),
                })),
            };
        });
        this._shop = value;
    }

    _shop: Shop;
    currency$: Observable<Currency[]> = this.store.select(currenciesSelector);
    level$ = this.store.select(levelSelector);
    private _availableSlot$ = this.store.select(availableSlot);

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

    public doCraftItem$: Subject<CraftSet> = new Subject();
    private _craftItemSubscription = this.doCraftItem$
        .pipe(
            withLatestFrom(
                this._availableSlot$,
                (event: CraftSet, availableSlot: number) => {
                    const item = event;
                    if (!this.canCraft(item.materials)) {
                        this._notifier.notify(
                            `${event.equipment.name}`,
                            "",
                            "cantCraft"
                        );
                        return;
                    }
                    if (availableSlot <= 0) {
                        this._notifier.notify(
                            `${event.equipment.name}`,
                            "",
                            "inventoryFull"
                        );
                        return;
                    } else {
                        if (this.canCraft(item.materials)) {
                            let equipment: ITemplateBaseEquipment = {
                                ...item.equipment,
                                id: entityId(item.equipment.name),
                            };

                            this.store.dispatch(
                                new GameStateInventoryAddItemAction({
                                    ...equipment,
                                    value: 0,
                                })
                            );
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
                }
            )
        )
        .subscribe();

    setWithStat(item: ITemplateArmor | ITemplateWeapon, l: number) {
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
        if (item.type == "weapon") {
            let weapon = item as ITemplateWeapon;
            weapon = {
                ...weapon,
                attack: weapon.attack * l,
                value: modifyPrice(weapon.quality, weapon.value * l),
                dps: toNumber(
                    ((weapon.attack * l) / (weapon.speed / 1000)).toFixed(2)
                ),
            };
            item = { ...weapon };
        }
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

    getStatDifference(item: ITemplateBaseItem): StatChange {
        let equipped = this.equipped(item);
        let change: StatChange = {};
        if (item.type == "item") return change;
        let equipment = item as ITemplateWeapon | ITemplateArmor;
        if (item.id === "null") return undefined;
        change.armor =
            equipped !== undefined &&
            equipped.id !== "null" &&
            item.type == "armor"
                ? (equipment as ITemplateArmor).armor -
                  (equipped as ITemplateArmor).armor
                : item.type == "weapon"
                ? 0
                : (item as ITemplateArmor).armor;
        change.stats =
            equipped !== undefined && equipped.id !== "null"
                ? [...equipment.stats].map((s, index) => {
                      return {
                          ...s,
                          value:
                              s.value -
                              (equipped as ITemplateWeapon | ITemplateArmor)
                                  .stats[index].value,
                      };
                  })
                : [...equipment.stats];
        return change;
    }
    trackByCraft(index: number, el: Craft) {
        return index;
    }
    trackByItem(index: number, el: ITemplateBaseItem) {
        return index;
    }
    trackByCurrency(index: number, el: Currency) {
        return index;
    }
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy() {
        this._craftItemSubscription.unsubscribe();
    }
}
