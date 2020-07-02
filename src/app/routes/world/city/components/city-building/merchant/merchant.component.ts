import { currenciesSelector, currencySelector } from "@core/models/selector";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
    Building,
    City,
    CurrencyConversion,
} from "@routes/world/city/store/cities.model";
import { merchantConversion } from "@routes/world/city/store/city.data";
import { Subject, Observable } from "rxjs";
import { withLatestFrom, first, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { NotifierService } from "@core/services/notifier.service";
import { CurrencyType } from "@core/models/game-data/game-data.data";
import { Currency } from "@core/models/game-data/game-data.model";
import { GameStateCurrenciesAddCurrencyAction } from "@core/models/game-state/game-state.action";

@Component({
    selector: "merchant",
    templateUrl: "./merchant.component.html",
    styleUrls: ["./merchant.component.scss"],
})
export class MerchantComponent implements OnInit, OnDestroy {
    @Input() building: Building;
    @Input() set city(value: City) {
        this.goods = [...merchantConversion.get(value.id).values()];
    }

    currencies$ = this.store.select(currenciesSelector);
    goods: CurrencyConversion[];

    doConvert$: Subject<CurrencyConversion> = new Subject();
    private _convertSubscription = this.doConvert$
        .pipe(
            withLatestFrom(
                this.currencies$,
                (event: CurrencyConversion, currencies) => {
                    if (
                        currencies.find((c) => c.name === event.from.name)
                            ?.quantity >= event.from.quantity
                    ) {
                        this.store.dispatch(
                            new GameStateCurrenciesAddCurrencyAction(event.to)
                        );
                        this.store.dispatch(
                            new GameStateCurrenciesAddCurrencyAction({
                                ...event.from,
                                quantity: -event.from.quantity,
                            })
                        );
                        this._notifier.notify(
                            event.to.name,
                            `currency ${event.to.name}`,
                            "bougth",
                            event.to.quantity
                        );
                    } else {
                        this._notifier.notify(
                            event.from.name,
                            `currency ${event.from.name}`,
                            "need",
                            event.from.quantity
                        );
                    }
                }
            )
        )
        .subscribe();

    public getCurrency(type: CurrencyType): Observable<Currency> {
        return this.store.select(currencySelector(type));
    }

    public canConvert(item: CurrencyConversion) {
        let can = false;
        this.getCurrency(item.from.name)
            .pipe(first())
            .subscribe((g) => (can = g?.quantity >= item.from.quantity));
        return can;
    }
    trackByFn(index: number, el: CurrencyConversion) {
        return index;
    }
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}
    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._convertSubscription.unsubscribe();
    }
}
