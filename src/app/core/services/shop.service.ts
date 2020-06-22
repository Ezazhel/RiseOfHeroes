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
@Injectable({
    providedIn: "root",
})
export class ShopService {
    cityId: string;
    level$: Observable<number> = this.store.select(levelSelector);
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    renewShopItem(cityId: string = this.cityId, shop: Shop) {
        let level: number;
        this.level$.pipe(first()).subscribe((l) => (level = l));
        //TODO : add maxLevel of city (because a city can't craft something at your level if your level is more than city's level)
        this.store.dispatch(
            new CityShopRenewItem({
                city: cityId,
                shopType: shop.type,
                items: this.renewByType(level, shop),
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
        this._notifier.notify(
            item.name,
            `${item.subType} ${item.icon}`,
            "bougth"
        );
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
        this._notifier.notify(
            item.name,
            `${item.subType} ${item.icon}`,
            "selled",
            item.value
        );
    }
}
