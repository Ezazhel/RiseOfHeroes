import { Injectable } from "@angular/core";
import {
    ITemplateBaseItem,
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateItem,
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
import { City, Shop } from "@routes/world/city/store/cities.model";
import { Map } from "immutable";
import { generateRandomArmor } from "@core/models/item-generation";
@Injectable({
    providedIn: "root",
})
export class ShopService {
    cityId: string;
    constructor(private store: Store<AppState>) {}

    renewShopItem(cityId: string = this.cityId, shop: Shop) {
        this.store.dispatch(
            new CityShopRenewItem({
                city: cityId,
                shopType: shop.type,
                items: this.renewByType(shop.type),
            })
        );
    }
    private renewByType(type: string): Map<string, ITemplateBaseItem> {
        switch (type) {
            case "blacksmith":
                let items = Map<string, ITemplateWeapon | ITemplateArmor>([]);
                for (let i = 0; i < 5; i++) {
                    let item = generateRandomArmor(1);
                    items = items.set(item.id, item);
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
    }
}
