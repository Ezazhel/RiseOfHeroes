import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
} from "@angular/core";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import {
    Observable,
    Subscription,
    interval,
    Subject,
    BehaviorSubject,
} from "rxjs";
import { currencySelector } from "@core/models/selector";
import { Map } from "immutable";
import {
    GameStateCurrenciesAddCurrencyAction,
    GameStateInventoryAddItemAction,
} from "@core/models/game-state/game-state.action";
import { Shop } from "@routes/world/city/store/cities.model";
import { ShopService } from "@core/services/shop.service";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
    selector: "app-city-shop-content",
    templateUrl: "./city-shop-content.component.html",
    styleUrls: ["./city-shop-content.component.scss"],
})
export class CityShopContentComponent implements OnInit, OnDestroy {
    @Input() displayedContent: string;
    private _shop$: Subject<Shop> = new BehaviorSubject<Shop>(null);
    shop$: Observable<Shop> = this._shop$;
    @Input("shop") set _shop(value: Shop) {
        this._shop$.next(value);
    }
    @Input() cityId: string;
    minutes: Subscription;
    timer: string;

    public _currencies$: Observable<Map<string, Currency>> = this.store.pipe(
        select(currencySelector)
    );

    public buyItem(item: ITemplateBaseItem): void {
        this._shop$
            .pipe(first())
            .subscribe((shop: Shop) =>
                this.shopService.buyItem(item, shop.type, this.cityId)
            );
    }

    public sellItem(item: ITemplateBaseItem) {
        this._shop$.pipe(first()).subscribe((shop: Shop) => {
            switch (shop.acceptType) {
                case "consumable":
                    if (item.type === "item")
                        this.shopService.sellItem(item, shop.type, this.cityId);
                    else alert("You can't sell this here");
                    break;
                case "equipment":
                    if (item.type === "armor" || item.type === "weapon")
                        this.shopService.sellItem(item, shop.type, this.cityId);
                    else alert("You can't sell this here");
                    break;
            }
        });
    }

    trackByFn(index: number, item: ITemplateBaseItem): string {
        return item.id;
    }
    constructor(
        private store: Store<AppState>,
        private shopService: ShopService
    ) {}

    ngOnInit(): void {
        var timer = 1 * 60;
        var minutes;
        var seconds;
        this.minutes = interval(1000).subscribe((x) => {
            minutes = Math.floor(timer / 60);
            seconds = Math.floor(timer % 60);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.timer = minutes + ":" + seconds;
            console.log(this.timer);

            --timer;
            if (timer < 0) {
                console.log("timeup");
            }
        });
    }

    ngOnDestroy() {
        this.minutes.unsubscribe();
    }
}
