import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { City, Shop } from "../../store/cities.model";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { citySelector } from "../../store/city.selector";
import { Map } from "immutable";
import { ShopService } from "@core/services/shop.service";
import { first } from "rxjs/operators";
@Component({
    selector: "app-city",
    templateUrl: "./city.component.html",
    styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
    city$: Observable<City>;
    shopType: string = "";

    setShopType(value: string) {
        this.shopType = value;
    }
    public trackByFn(index: number, el: Map<string, Shop>): number {
        return index;
    }

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private shopService: ShopService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let cityId = params.get("cityId");
            this.city$ = this.store.pipe(select(citySelector(cityId)));
            this.city$.pipe(first()).subscribe((city: City) => {
                setTimeout(
                    () => this.shopService.renewShopItem(city),
                    3 * 1000
                );
            });
        });
    }
}
