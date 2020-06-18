import { currencySelector, equippedSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { Component, OnInit, Input } from "@angular/core";
import { Shop, Craft, CraftSet } from "@routes/world/city/store/cities.model";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
    selector: "app-city-shop-craft",
    templateUrl: "./city-shop-craft.component.html",
    styleUrls: ["./city-shop-craft.component.scss"],
})
export class CityShopCraftComponent implements OnInit {
    @Input() cityId: string;

    @Input("shop") set shop(value: Shop) {
        this._shop = value;
    }

    _shop: Shop;
    currency$: Observable<Currency[]> = this.store.select(currencySelector);

    private canCraft(material: Currency[]) {
        return true;
    }
    craft(item: CraftSet) {
        if (this.canCraft(item.materials)) console.log("craft", item.equipment);
    }

    public equipped(item: ITemplateBaseItem) {
        let equipped: ITemplateBaseItem;
        this.store
            .select(equippedSelector(item?.type == "weapon", item?.subType))
            .pipe(take(1))
            .subscribe((i) => (equipped = i));
        return equipped;
    }

    trackByCraft(index: number, el: Craft) {
        return el;
    }
    trackByItem(index: number, el: ITemplateBaseItem) {
        return el;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
