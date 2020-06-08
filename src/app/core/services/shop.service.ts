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
                items: this.renewByType(shop.type, shop.maxItemQuality),
            })
        );
    }
    private renewByType(
        type: string,
        maxQuality: number
    ): Array<ITemplateWeapon | ITemplateArmor> {
        switch (type) {
            case "blacksmith":
                let items: Array<ITemplateWeapon | ITemplateArmor> = [];
                for (let i = 0; i < 5; i++) {
                    items.push(generateRandomArmor(1, maxQuality));
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
