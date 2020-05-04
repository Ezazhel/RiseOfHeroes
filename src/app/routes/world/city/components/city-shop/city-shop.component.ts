import { Component, OnInit, Input } from "@angular/core";
import { Shop } from "../../store/cities.model";
import { ShopService } from "@core/services/shop.service";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Observable } from "rxjs";
import { AppState } from "@core/models";
import { Store, select } from "@ngrx/store";
import { shopSelector } from "../../store/city.selector";

@Component({
    selector: "app-city-shop",
    templateUrl: "./city-shop.component.html",
    styleUrls: ["./city-shop.component.scss"],
})
export class CityShopComponent implements OnInit {
    @Input() set shopType(value: string) {
        this._shop$ = this.store.pipe(select(shopSelector(this.cityId, value)));
    }
    @Input() cityId: string;
    _shop$: Observable<Shop>;
    displayedContent: string = "shop";

    constructor(
        private shopService: ShopService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this._shop$ = this.store.pipe(
            select(shopSelector(this.cityId, this.shopType))
        );
    }
}
