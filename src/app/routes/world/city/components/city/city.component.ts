import {
    ITemplateItem,
    City,
    ITemplateWeapon,
    ITemplateArmor,
    ItemSellableType,
} from "@core/models/game-data/game-data.model";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Map } from "immutable";
import { Component, OnInit } from "@angular/core";

export interface Shop {
    type: string;
    name: string;
    items: Map<string, ITemplateBaseItem>;
    display: boolean;
    crafts?: any[];
    upgrades?: any[];
    acceptType: ItemSellableType;
}

@Component({
    selector: "app-city",
    templateUrl: "./city.component.html",
    styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
    city: City = {
        name: "Zul'ah",
        id: "zulah",
        levelRequirement: 0,
    };
    shops: Shop[] = [
        {
            type: "blacksmith",
            name: "Blacksmith",
            items: Map<string, ITemplateWeapon | ITemplateArmor>([
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
            ]),
            crafts: [],
            display: false,
            acceptType: "equipment",
        },
        {
            type: "alchemist",
            name: "Alchemist",
            items: Map<string, ITemplateItem>([
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
            ]),
            upgrades: [],
            display: false,
            acceptType: "consumable",
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
