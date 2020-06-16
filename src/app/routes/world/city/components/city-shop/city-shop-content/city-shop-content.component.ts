import { Component, OnInit, Input } from "@angular/core";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { Shop } from "@routes/world/city/store/cities.model";
import { ShopService } from "@core/services/shop.service";
import { TranslocoService } from "@ngneat/transloco";

@Component({
    selector: "app-city-shop-content",
    templateUrl: "./city-shop-content.component.html",
    styleUrls: ["./city-shop-content.component.scss"],
})
export class CityShopContentComponent implements OnInit {
    @Input() cityId: string;
    @Input() displayedContent: string;
    @Input("shop") set shop(value: Shop) {
        this._shop = value;
    }
    _shop: Shop;

    public sellItem(item: ITemplateBaseItem) {
        switch (this._shop.acceptType) {
            case "consumable":
                if (item.type === "item")
                    this.shopService.sellItem(
                        item,
                        this._shop.type,
                        this.cityId
                    );
                else alert("You can't sell this here");
                break;
            case "equipment":
                if (item.type === "armor" || item.type === "weapon")
                    this.shopService.sellItem(
                        item,
                        this._shop.type,
                        this.cityId
                    );
                else alert("You can't sell this here");
                break;
        }
    }

    trackByFn(index: number, item: ITemplateBaseItem): number {
        return index;
    }
    constructor(
        private store: Store<AppState>,
        private shopService: ShopService,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {}
}
