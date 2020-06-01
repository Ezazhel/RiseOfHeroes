import { ShopUpgrade } from "./../../../../store/cities.model";
import { Component, OnInit, Input } from "@angular/core";
import { Shop } from "@routes/world/city/store/cities.model";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { CityUpgradeShop } from "@routes/world/city/store/cities.action";
import { Map } from "immutable";
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
    doSomething(u: ShopUpgrade, index: number) {
        this._shop = u.upgrade(this._shop, u.level + 1, index);
        console.log(u.descriptionParameters(this._shop));
        this.store.dispatch(
            new CityUpgradeShop({
                city: this.cityId,
                shopType: this._shop.type,
                shop: this._shop,
            })
        );
    }

    trackByFn(index: number, upgrade: ShopUpgrade): ShopUpgrade {
        return upgrade;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
