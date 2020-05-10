import { ShopUpgrade } from "./../../../../store/cities.model";
import { Component, OnInit, Input } from "@angular/core";
import { Shop } from "@routes/world/city/store/cities.model";

@Component({
    selector: "app-city-shop-content-upgrade",
    templateUrl: "./city-shop-content-upgrade.component.html",
    styleUrls: ["./city-shop-content-upgrade.component.scss"],
})
export class CityShopContentUpgradeComponent implements OnInit {
    @Input() cityId: string;

    @Input("shop") set shop(value: Shop) {
        this._shop = value;
    }

    _shop: Shop;
    doSomething(shop: Shop) {
        this._shop = shop;
        console.log(this._shop);
    }

    trackByFn(index: number, upgrade: ShopUpgrade): ShopUpgrade {
        return upgrade;
    }
    constructor() {}

    ngOnInit(): void {}
}
