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
    @Input("shop") set shop(value: Observable<Shop>) {
        this.shop$ = value;
        this.displayedContent = "shop";
    }
    @Input() cityId: string;
    shop$: Observable<Shop>;
    displayedContent: string = "shop";

    constructor() {}

    ngOnInit(): void {}
}
