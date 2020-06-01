import { Map } from "immutable";
import { City, Shop } from "./cities.model";
import {
    ITemplateItem,
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import * as CityAction from "./cities.action";
import * as upgrd from "@core/models/upgrades";
import { shopSelector } from "./city.selector";

const initialState: CitiesState = {
    cities: Map<string, City>([
        [
            "zulah",
            {
                id: "zulah",
                name: "Zul'Ah",
                description: "city.zulah.description",
                levelRequirement: 0,
                shops: Map<string, Shop>([
                    [
                        "blacksmith",
                        {
                            type: "blacksmith",
                            name: "city.city_shop.blacksmith",
                            maxItemQuality: 2,
                            items: Map<
                                string,
                                ITemplateWeapon | ITemplateArmor
                            >(),
                            crafts: [],
                            upgrades: [
                                {
                                    name: "upgrades.blacksmith.faster.name",
                                    description:
                                        "upgrades.blacksmith.faster.effect",
                                    descriptionParameters: (
                                        shop: Shop
                                    ): any => {
                                        return {
                                            intervalStock: shop.intervalStock,
                                        };
                                    },
                                    level: 0,
                                    levelMax: 5,
                                    basePrice: 1000,
                                    price: (
                                        level: number,
                                        prixBase: number
                                    ): number =>
                                        prixBase * (1 + (level * 10) / 100),
                                    upgrade: (
                                        shop: Shop,
                                        level: number,
                                        index: number
                                    ): Shop =>
                                        upgrd.restockTimeUpgrade(
                                            shop,
                                            level,
                                            index
                                        ),
                                },
                                {
                                    name: "upgrades.blacksmith.better.name",
                                    description:
                                        "upgrades.blacksmith.better.effect",
                                    descriptionParameters: (
                                        shop: Shop
                                    ): any => {
                                        return { quality: shop.maxItemQuality };
                                    },
                                    level: 0,
                                    levelMax: 2,
                                    basePrice: 2000,
                                    price: (
                                        level: number,
                                        prixBase: number
                                    ): number =>
                                        prixBase * (1 + (level * 300) / 100),
                                    upgrade: (
                                        shop: Shop,
                                        level: number,
                                        index: number
                                    ): Shop =>
                                        upgrd.improveQualityUpgrade(
                                            shop,
                                            level,
                                            index
                                        ),
                                },
                            ],
                            display: false,
                            acceptType: "equipment",
                            intervalStock: 15,
                            lastTick: performance.now(),
                        },
                    ],
                    [
                        "alchemist",
                        {
                            type: "alchemist",
                            name: "city.city_shop.alchemist",
                            items: Map<string, ITemplateItem>([
                                [
                                    "item1",
                                    {
                                        id: "item1",
                                        name: "Health Potion",
                                        value: 150,
                                        level: 0,
                                        icon: "t_23",
                                        type: "item",
                                        quality: "common",
                                        subType: "potion",
                                    },
                                ],
                                [
                                    "item2",
                                    {
                                        id: "item2",
                                        name: "Mana Potion",
                                        value: 150,
                                        level: 0,
                                        icon: "t_21",
                                        type: "item",
                                        quality: "common",
                                        subType: "potion",
                                    },
                                ],
                            ]),
                            upgrades: [],
                            display: false,
                            acceptType: "consumable",
                        },
                    ],
                ]),
            },
        ],
    ]),
};

export interface CitiesState {
    cities: Map<string, City>;
}

export function citiesReducer(
    state: CitiesState = initialState,
    action: CityAction.CityActionType
) {
    switch (action.type) {
        case CityAction.CITY_SHOP_BUY:
            //Buying remove item from a shop in a specific city
            return {
                ...state,
                cities: state.cities.set(
                    action.payload.city,
                    setOrRemoveItem(
                        state,
                        action.payload.city,
                        action.payload.shopType,
                        true,
                        action.payload.item
                    )
                ),
            };
        case CityAction.CITY_SHOP_RENEW_ITEM:
            //Pass a list of items for a shop, might be call multiple time depending of timer (not every shop have the same timer)
            return {
                ...state,
                cities: state.cities.set(
                    action.payload.city,
                    renewItem(
                        state,
                        action.payload.city,
                        action.payload.shopType,
                        action.payload.items
                    )
                ),
            };
        case CityAction.CITY_SHOP_SELL:
            //Add an object to a specific shop in a specific city
            return {
                ...state,
                cities: state.cities.set(
                    action.payload.city,
                    setOrRemoveItem(
                        state,
                        action.payload.city,
                        action.payload.shopType,
                        false,
                        action.payload.item
                    )
                ),
            };
        case CityAction.CITY_UPGRADE_SHOP:
            return {
                ...state,
                cities: state.cities.setIn(
                    [action.payload.city, "shops", action.payload.shop.type],
                    action.payload.shop
                ),
            };
        default:
            return state;
    }
}

function setOrRemoveItem(
    state: CitiesState,
    cityId: string,
    shopType: string,
    isRemove: boolean,
    item: ITemplateBaseItem
) {
    let city = state.cities.get(cityId);
    let shop = city.shops.get(shopType);
    if (isRemove) {
        shop = { ...shop, items: shop.items.remove(item.id) };
    } else {
        shop = { ...shop, items: shop.items.set(item.id, item) };
    }
    city = { ...city, shops: city.shops.set(shopType, shop) };
    return city;
}

function renewItem(
    state: CitiesState,
    cityId: string,
    shopType: string,
    items?: Map<string, ITemplateBaseItem>
): City {
    let city = state.cities.get(cityId);
    return (city = {
        ...city,
        shops: city.shops.set(shopType, {
            ...city.shops.get(shopType),
            items: items,
            lastTick: performance.now(),
        }),
    });
}
