import { goldSelector } from "./../../../../../../../core/models/selector";
import { ShopUpgrade } from "./../../../../store/cities.model";
import { Component, OnInit, Input } from "@angular/core";
import { Shop } from "@routes/world/city/store/cities.model";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { CityUpgradeShop } from "@routes/world/city/store/cities.action";
import { upgrade, descriptionFor, price } from "@core/models/upgrades";
import { Observable } from "rxjs";
import { Currency } from "@core/models/game-data/game-data.model";
import { GameStateCurrenciesAddCurrencyAction } from "@core/models/game-state/game-state.action";
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
    upgrade(u: ShopUpgrade, index: number) {
        this._shop = upgrade(u, this._shop, index);
        this.store.dispatch(
            new CityUpgradeShop({
                city: this.cityId,
                shopType: this._shop.type,
                shop: this._shop,
            })
        );
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: -price(u),
            })
        );
    }
    _gold$: Observable<Currency> = this.store.select(goldSelector);
    descriptionFor(u: ShopUpgrade, shop: Shop) {
        return descriptionFor(u, shop);
    }
    price(u: ShopUpgrade) {
        return price(u);
    }

    trackByFn(index: number, upgrade: ShopUpgrade): ShopUpgrade {
        return upgrade;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
