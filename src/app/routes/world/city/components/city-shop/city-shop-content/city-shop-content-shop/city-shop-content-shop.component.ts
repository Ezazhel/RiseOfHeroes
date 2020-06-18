import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { Shop } from "@routes/world/city/store/cities.model";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { TranslocoService } from "@ngneat/transloco";
import { ShopService } from "@core/services/shop.service";
import { Subscription, timer, Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import {
    currenciesSelector,
    goldSelector,
    equippedSelector,
} from "@core/models/selector";
import { take } from "rxjs/operators";
@Component({
    selector: "app-city-shop-content-shop",
    templateUrl: "./city-shop-content-shop.component.html",
    styleUrls: ["./city-shop-content-shop.component.scss"],
})
export class CityShopContentShopComponent
    implements OnInit, OnDestroy, OnChanges {
    @Output() onSetItem = new EventEmitter<ITemplateBaseItem>();
    @Output() itemNull = new EventEmitter<boolean>();
    @Input() cityId: string;

    @Input("shop") set shop(value: Shop) {
        this._shop = value;
    }

    _shop: Shop;
    minutes: Subscription;
    timer: string;
    _previousSecond: number = 0;

    public _currencies$: Observable<Array<Currency>> = this.store.pipe(
        select(currenciesSelector)
    );

    getCurrency(type: string): Observable<Currency> {
        //param if one day i create a generic selector for currencies
        return this.store.select(goldSelector);
    }
    public buyItem(item: ITemplateBaseItem): void {
        this.shopService.buyItem(item, this._shop.type, this.cityId);
        this.itemNull.emit(true);
    }

    private renew(value: Shop) {
        if (this.minutes != undefined) this.minutes.unsubscribe();
        const nf = new Intl.NumberFormat(this.transloco.getActiveLang(), {
            maximumSignificantDigits: 2,
            minimumIntegerDigits: 2,
        });
        const perf = performance.now();

        let renewTimerMinute =
            (perf - value.lastTick) / 1000 / value.intervalStock; //use when we come back on shop
        let renewTimerSecond =
            ((perf - value.lastTick) / 1000) % value.intervalStock; //second
        let t = value.intervalStock - renewTimerSecond - this._previousSecond; // renewTimer will always be lt intervalStock
        t = Math.round(t);

        this.minutes = timer(0, 1000).subscribe((x) => {
            this.timer = `${nf.format(Math.floor(t / 60))} : ${nf.format(
                Math.floor(t % 60)
            )}`;
            --t;
            if (
                t < 0 ||
                renewTimerMinute >= 1 ||
                this._shop.items.length == 0
            ) {
                renewTimerMinute >= 1
                    ? (this._previousSecond = renewTimerSecond)
                    : (this._previousSecond = 0);
                this.shopService.renewShopItem(this.cityId, value);
                this.minutes.unsubscribe();
            }
        });
    }

    public setItem(item: ITemplateBaseItem) {
        this.onSetItem.emit(item);
        this.itemNull.emit(item == null);
    }

    public equipped(item: ITemplateBaseItem) {
        let equipped: ITemplateBaseItem;
        this.store
            .select(equippedSelector(item?.type == "weapon", item?.subType))
            .pipe(take(1))
            .subscribe((i) => (equipped = i));
        return equipped;
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
    ngOnChanges(changes: SimpleChanges): void {
        const pShop = changes["shop"].previousValue as Shop;
        const cShop = changes["shop"].currentValue as Shop;
        if (changes["shop"].firstChange || pShop?.type != cShop.type) {
            this._previousSecond = 0;
            if (this._shop.intervalStock !== undefined) this.renew(this._shop);
        } else if (
            pShop?.type === cShop.type &&
            pShop?.lastTick !== cShop.lastTick
        ) {
            this.renew(this._shop); // /!\ PROBLEM : Timer are irrelevant once pass here
        }
    }
    ngOnDestroy() {
        if (this.minutes !== undefined) this.minutes.unsubscribe();
    }
}
