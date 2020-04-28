import { Shop } from "./../city/city.component";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-city-shop",
    templateUrl: "./city-shop.component.html",
    styleUrls: ["./city-shop.component.scss"],
})
export class CityShopComponent implements OnInit {
    @Input() shop: Shop;
    displayedContent: string = "shop";

    displayContent(content: string) {
        console.log(content);
        this.displayedContent = content;
    }

    constructor() {}

    ngOnInit(): void {}
}
