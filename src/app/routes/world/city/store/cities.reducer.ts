import { City, Shop, baseHuntingAction, Building } from "./cities.model";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import * as CityAction from "./cities.action";
import { update } from "@core/models/utils";
import { createUpgrade, upgrade } from "@core/models/upgrades";

const initialState: CitiesState = {
    cities: [
        {
            id: "zulah",
            name: "Zul'Ah",
            description: "city.zulah.description",
            levelRequirement: 0,
            maxLevel: 5,
            shops: [
                {
                    type: "blacksmith",
                    name: "city.city_shop.blacksmith",
                    maxItemQuality: 1,
                    maxItem: 5,
                    items: [],
                    crafts: [],
                    upgrades: [
                        {
                            ...createUpgrade("faster", 2, 500, "faster"),
                        },
                        {
                            ...createUpgrade("better", 2, 2000, "better"),
                        },
                        {
                            ...createUpgrade("more", 5, 250, "more"),
                        },
                    ],
                    display: false,
                    acceptType: "equipment",
                    intervalStock: 15,
                    lastTick: performance.now(),
                },
                {
                    type: "alchemist",
                    name: "city.city_shop.alchemist",
                    items: [
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
                    upgrades: [],
                    display: false,
                    acceptType: "consumable",
                },
            ],
            building: [
                {
                    type: "huntingPost",
                    name: "city.city_building.huntingPost.name",
                    actions: [
                        {
                            ...baseHuntingAction,
                            targetId: 0, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 1, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 2, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                    ],
                },
            ],
        },
    ],
};

export interface CitiesState {
    cities: City[];
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
                cities: update(
                    state.cities,
                    (c: City) => c.id == action.payload.city,
                    (c: City) => ({
                        ...c,
                        shops: update(
                            c.shops,
                            (s: Shop) => s.type == action.payload.shopType,
                            (s: Shop) => ({
                                ...s,
                                items: [...s.items].filter(
                                    (i: ITemplateBaseItem) =>
                                        i.id != action.payload.item.id
                                ),
                            })
                        ),
                    })
                ),
            };
        case CityAction.CITY_SHOP_RENEW_ITEM:
            //Pass a list of items for a shop, might be call multiple time depending of timer (not every shop have the same timer)
            return {
                ...state,
                cities: update(
                    state.cities,
                    (c: City) => c.id == action.payload.city,
                    (c: City) =>
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
                cities: update(
                    state.cities,
                    (c: City) => c.id == action.payload.city,
                    (c: City) => ({
                        ...c,
                        shops: update(
                            c.shops,
                            (s: Shop) => s.type == action.payload.shopType,
                            (s: Shop) => ({
                                ...s,
                                items: [...s.items].concat(action.payload.item),
                            })
                        ),
                    })
                ),
            };
        case CityAction.CITY_UPGRADE_SHOP:
            return {
                ...state,
                cities: update(
                    state.cities,
                    (c: City) => c.id == action.payload.city,
                    (c: City) => ({
                        ...c,
                        shops: update(
                            c.shops,
                            (s: Shop) => s.type == action.payload.shop.type,
                            (s: Shop) => action.payload.shop
                        ),
                    })
                ),
            };
        case CityAction.CITY_BUILDING_UPGRADE_FIGHTER:
            return {
                ...state,
                cities: update(
                    state.cities,
                    (c: City) => c.id == action.payload.city,
                    (c: City) => ({
                        ...c,
                        building: update(
                            c.building,
                            (b: Building) => b.type == "huntingPost",
                            (b: Building) => action.payload.building
                        ),
                    })
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
    let cityIndex = state.cities.findIndex((c: City) => c.id == cityId);
    let city = { ...state.cities[cityIndex] };
    let shopIndex = city.shops.findIndex((s: Shop) => s.type == shopType);
    let shop = { ...city.shops[shopIndex] };
    if (isRemove) {
        let items = [
            ...shop.items.filter((i: ITemplateBaseItem) => i.id != item.id),
        ];
        city.shops[shopIndex] = {
            ...shop,
            items: [...items],
        };
    } else {
        city.shops[shopIndex] = { ...shop, items: shop.items.concat(item) };
    }
    return city;
}

function renewItem(
    state: CitiesState,
    cityId: string,
    shopType: string,
    items?: ITemplateBaseItem[]
): City {
    let cityIndex = state.cities.findIndex((c: City) => c.id == cityId);
    let newCity = { ...state.cities[cityIndex] };
    function set(
        shopType: string,
        shops: Shop[],
        items: ITemplateBaseItem[]
    ): Shop[] {
        let shopIndex = shops.findIndex((s: Shop) => s.type == shopType);
        shops = [...shops];
        shops[shopIndex] = {
            ...shops[shopIndex],
            items: items,
            lastTick: performance.now(),
        };
        return shops;
    }
    return {
        ...newCity,
        shops: set(shopType, [...newCity.shops], items),
    };
}
