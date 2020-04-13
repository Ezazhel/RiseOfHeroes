import {
    ITemplateItem,
    City,
} from "./../../../../../core/models/game-data/game-data.model";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Map } from "immutable";
import { Component, OnInit } from "@angular/core";

export interface Shop {
    name: string;
    items: Map<string, ITemplateBaseItem>;
    display: boolean;
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
            name: "Blacksmith",
            items: Map<string, ITemplateBaseItem>([
                [
                    "armor1",
                    {
                        id: "armor1",
                        name: "Armor",
                        value: 250,
                        level: 1,
                        icon: "",
                        type: "armor",
                    },
                ],
                [
                    "armor2",
                    {
                        id: "armor2",
                        name: "Gauntlet",
                        value: 150,
                        level: 1,
                        icon: "",
                        type: "item",
                    },
                ],
            ]),
            display: false,
        },
        {
            name: "Alchemist",
            items: Map<string, ITemplateBaseItem>([
                [
                    "item1",
                    {
                        id: "item1",
                        name: "Health Potion",
                        value: 150,
                        level: 0,
                        icon: "",
                        type: "item",
                    },
                ],
                [
                    "item2",
                    {
                        id: "item2",
                        name: "Mana Potion",
                        value: 150,
                        level: 0,
                        icon: "",
                        type: "item",
                    },
                ],
            ]),
            display: false,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
