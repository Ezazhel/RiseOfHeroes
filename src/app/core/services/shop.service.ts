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
                return Map<string, ITemplateWeapon | ITemplateArmor>([
                    [
                        "armor1",
                        {
                            id: "armor1",
                            name: "Armor",
                            value: 2,
                            level: 1,
                            icon: "armor",
                            type: "armor",
                            subType: "chest",
                            defense: 5,
                            style: "rare",
                        },
                    ],
                    [
                        "armor2",
                        {
                            id: "armor2",
                            name: "Gauntlet",
                            value: 1,
                            level: 1,
                            icon: "armor",
                            type: "armor",
                            subType: "chest",
                            defense: 5,
                            style: "common",
                        },
                    ],
                    [
                        "armor3",
                        {
                            id: "armor31",
                            name: "Armor",
                            value: 2,
                            level: 1,
                            icon: "armor",
                            type: "armor",
                            subType: "chest",
                            defense: 5,
                            style: "rare",
                        },
                    ],
                    [
                        "armor41",
                        {
                            id: "armor41",
                            name: "Armor",
                            value: 2,
                            level: 1,
                            icon: "armor",
                            type: "armor",
                            subType: "chest",
                            defense: 5,
                            style: "rare",
                        },
                    ],
                    [
                        "armor51",
                        {
                            id: "armor51",
                            name: "Armor",
                            value: 2,
                            level: 1,
                            icon: "armor",
                            type: "armor",
                            subType: "chest",
                            defense: 5,
                            style: "rare",
                        },
                    ],
                ]);
            case "alchemist":
                return Map<string, ITemplateItem>([
                    [
                        "item1",
                        {
                            id: "item1",
                            name: "Health Potion",
                            value: 150,
                            level: 0,
                            icon: "potionRed",
                            type: "item",
                            style: "",
                        },
                    ],
                    [
                        "item21",
                        {
                            id: "item21",
                            name: "Health Potion",
                            value: 150,
                            level: 0,
                            icon: "potionRed",
                            type: "item",
                            style: "",
                        },
                    ],
                    [
                        "item2",
                        {
                            id: "item2",
                            name: "Mana Potion",
                            value: 150,
                            level: 0,
                            icon: "potionBlue",
                            type: "item",
                            style: "",
                        },
                    ],
                    [
                        "item23",
                        {
                            id: "item23",
                            name: "Mana Potion",
                            value: 150,
                            level: 0,
                            icon: "potionBlue",
                            type: "item",
                            style: "",
                        },
                    ],
                ]);
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
