import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { City, Shop, Building } from "../../store/cities.model";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { citySelector } from "../../store/city.selector";
import { Map } from "immutable";
import { ShopService } from "@core/services/shop.service";
import { map } from "rxjs/operators";
@Component({
    selector: "app-city",
    templateUrl: "./city.component.html",
    styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
    city$: Observable<City>;
    shop$: Observable<Shop>;
    building$: Observable<Building>;

    tab: string;
    setShop(value: Shop) {
        this.shop$ = this.city$.pipe(
            map((city: City) => city.shops.find((s) => s.type == value.type))
        );
        this.building$ = null;
    }

    setBuilding(value: Building) {
        this.building$ = this.city$.pipe(
            map((city: City) => city.building.find((b) => b.type == value.type))
        );
        this.shop$ = null;
    }
    setTab(value: string) {
        this.tab = value;
    }
    public trackByFn(index: number, el: Array<Shop>): number {
        return index;
    }
    public trackByFnBuilding(index: number, el: Array<Building>): number {
        return index;
    }

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private shopService: ShopService
    ) {
        this.shopService.cityId = this.route.snapshot.paramMap.get("cityId");
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.shopService.cityId = params.get("cityId");
            this.city$ = this.store.pipe(
                select(citySelector(params.get("cityId")))
            );
            this.setTab("");
            this.shop$ = null;
            this.building$ = null;
        });
    }
}
