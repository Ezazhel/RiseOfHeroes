import { Injectable } from "@angular/core";
import {
    ITemplateBaseItem,
    ITemplateWeapon,
    ITemplateArmor,
} from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import {
    GameStateCurrenciesAddCurrencyAction,
    GameStateInventoryRemoveItemAction,
    GameStateInventoryAddItemAction,
} from "@core/models/game-state/game-state.action";
import {
    CityShopSellItem,
    CityShopBuy,
    CityShopRenewItem,
} from "@routes/world/city/store/cities.action";
import { Shop } from "@routes/world/city/store/cities.model";
import { generateReward } from "@core/models/loot/item-generation";
import { Observable } from "rxjs";
import { levelSelector } from "@core/models/selector";
import { first } from "rxjs/operators";
import { NotifierService } from "./notifier.service";
import { cities } from "@routes/world/city/store/city.data";
@Injectable({
    providedIn: "root",
})
export class ShopService {
    cityId: string;
    heroLevel$: Observable<number> = this.store.select(levelSelector);

    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    renewShopItem(cityId: string = this.cityId, shop: Shop) {
        let city = cities.get(cityId);
        let minlevelEquipement = city.levelRequirement; // minimum this
        this.heroLevel$.pipe(first()).subscribe((heroLvl) => {
            minlevelEquipement =
                heroLvl > minlevelEquipement
                    ? heroLvl > city.maxLevel
                        ? city.maxLevel
                        : heroLvl
                    : minlevelEquipement;
        });
        this.store.dispatch(
            new CityShopRenewItem({
                city: cityId,
                shopType: shop.type,
                items: this.renewByType(minlevelEquipement, shop),
            })
        );
    }
    private renewByType(
        level: number,
        shop: Shop
    ): Array<ITemplateWeapon | ITemplateArmor> {
        switch (shop.type) {
            case "blacksmith":
                let items: Array<ITemplateWeapon | ITemplateArmor> = [];
                for (let i = 0; i < shop.maxItem; i++) {
                    let item = generateReward(level, shop.maxItemQuality);
                    items.push(item);
                }
                return items;
        }
    }

    buyItem(item: ITemplateBaseItem, shopType: string, cityId: string): void {
        this.store.dispatch(
            new CityShopBuy({ item: item, shopType: shopType, city: cityId })
        );
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: -item.value,
            })
        );
        this.store.dispatch(new GameStateInventoryAddItemAction(item));
        this._notifier.notify("1icon", "bougth", item.name, 1000, item); //bought
    }

    sellItem(item: ITemplateBaseItem, shopType: string, cityId: string) {
        this.store.dispatch(
            new CityShopSellItem({
                item: item,
                shopType: shopType,
                city: cityId,
            })
        );
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: item.value,
            })
        );
        this.store.dispatch(new GameStateInventoryRemoveItemAction(item.id));
        this._notifier.notify("1icon", "selled", item.name, 1000, item); //selled
    }
}
