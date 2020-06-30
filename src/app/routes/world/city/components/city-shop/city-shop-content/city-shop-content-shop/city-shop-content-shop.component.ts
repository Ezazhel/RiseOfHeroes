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
import { Subscription, timer, Observable, Subject } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import {
    currenciesSelector,
    goldSelector,
    equippedSelector,
    currencySelector,
    inventorySelector,
    sliceGameStateMaxSlots,
    availableSlot,
} from "@core/models/selector";
import { take, first, withLatestFrom } from "rxjs/operators";
import { NotifierService } from "@core/services/notifier.service";
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
    private _availableSlot$ = this.store.select(availableSlot);
    _shop: Shop;
    minutes: Subscription;
    timer: string;
    _previousSecond: number = 0;

    public _gold$: Observable<Currency> = this.store.select(
        currencySelector("gold")
    );
    public doBuyItem$: Subject<ITemplateBaseItem> = new Subject();
    private _buyItemSubcription = this.doBuyItem$
        .pipe(
            withLatestFrom(
                this._availableSlot$,
                (event: ITemplateBaseItem, availableSlot: number) => {
                    if (availableSlot <= 0) {
                        this._notifier.notify(
                            `${event.name}`,
                            "",
                            "inventoryFull"
                        );
                    } else {
                        let currentGold: number;
                        this._gold$
                            .pipe(first())
                            .subscribe(
                                (g: Currency) => (currentGold = g.quantity)
                            );
                        if (currentGold >= event.value) {
                            this.shopService.buyItem(
                                event,
                                this._shop.type,
                                this.cityId
                            );
                            this.itemNull.emit(true);
                        } else {
                            this._notifier.notify(
                                "",
                                "currency gold",
                                "need",
                                event.value
                            );
                        }
                    }
                }
            )
        )
        .subscribe();

    private renew(value: Shop) {
        if (this.minutes != undefined) this.minutes.unsubscribe();
        const nf = new Intl.NumberFormat(this.transloco.getActiveLang(), {
            maximumSignificantDigits: 2,
            minimumIntegerDigits: 2,
        });
        const now = Date.now();

        let renewTimerMinute =
            (now - value.lastTick) / 1000 / value.intervalStock; //use when we come back on shop
        let renewTimerSecond =
            ((now - value.lastTick) / 1000) % value.intervalStock; //second
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
        private transloco: TranslocoService,
        private _notifier: NotifierService
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
        this._buyItemSubcription.unsubscribe();
    }
}
