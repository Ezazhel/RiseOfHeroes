import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    OnChanges,
    SimpleChange,
    SimpleChanges,
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
    timer,
    Subject,
    BehaviorSubject,
    asyncScheduler,
} from "rxjs";
import { currencySelector } from "@core/models/selector";
import { Map } from "immutable";
import { Shop } from "@routes/world/city/store/cities.model";
import { ShopService } from "@core/services/shop.service";
import { first } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";

@Component({
    selector: "app-city-shop-content",
    templateUrl: "./city-shop-content.component.html",
    styleUrls: ["./city-shop-content.component.scss"],
})
export class CityShopContentComponent implements OnInit, OnDestroy, OnChanges {
    @Input() cityId: string;
    @Input() displayedContent: string;

    private _shop$: Subject<Shop> = new BehaviorSubject<Shop>(null);
    shop$: Observable<Shop> = this._shop$;
    minutes: Subscription;
    timer: string;
    @Input("shop") set _shop(value: Shop) {
        this._shop$.next(value);
        this.renew(value);
    }

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

    private renew(value: Shop) {
        if (this.minutes != undefined) this.minutes.unsubscribe();
        const nf = new Intl.NumberFormat(this.transloco.getActiveLang(), {
            maximumSignificantDigits: 2,
            minimumIntegerDigits: 2,
        });
        const perf = performance.now();
        let renewTimerMinute =
            (perf - value.lastTick) / 1000 / value.intervalStock; //cycle
        let renewTimerSecond =
            ((perf - value.lastTick) / 1000) % value.intervalStock; //second
        if (renewTimerMinute >= 1) {
            console.log("Renew minute", this.cityId);
            this.shopService.renewShopItem(this.cityId, value);
            if (this.minutes != undefined) this.minutes.unsubscribe();
        }
        let t = value.intervalStock - Math.floor(renewTimerSecond); // renewTimer will always be lt intervalStock
        this.timer = `${nf.format(Math.floor(t / 60))} : ${nf.format(
            Math.floor(t % 60)
        )}`;
        this.minutes = timer(0, 1000, asyncScheduler).subscribe((x) => {
            this.timer = `${nf.format(Math.floor(t / 60))} : ${nf.format(
                Math.floor(t % 60)
            )}`;
            --t;

            if (t < 0) {
                console.log("Renew interval");
                this.shopService.renewShopItem(this.cityId, value);
                t = value.intervalStock;
            }
        });
    }

    trackByFn(index: number, item: ITemplateBaseItem): string {
        return item.id;
    }
    constructor(
        private store: Store<AppState>,
        private shopService: ShopService,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy() {
        this.minutes.unsubscribe();
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        this._shop$.pipe(first()).subscribe((value) => {
            this.renew(value);
        });
    }
}
