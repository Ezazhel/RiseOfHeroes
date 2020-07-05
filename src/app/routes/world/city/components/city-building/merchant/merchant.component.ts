import { heroSelector } from "./../../../../../../core/models/selector";
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
import {
    GameStateCurrenciesAddCurrencyAction,
    GameStateUpdateHeroAction,
} from "@core/models/game-state/game-state.action";
import { levelUpFromAction, getXPForAction } from "@core/models/level";

export interface Conversion {
    conversion: CurrencyConversion;
    qty: number;
}
@Component({
    selector: "merchant",
    templateUrl: "./merchant.component.html",
    styleUrls: ["./merchant.component.scss"],
})
export class MerchantComponent implements OnInit, OnDestroy {
    @Input() building: Building;
    @Input() set city(value: City) {
        this.goodsBougth = [
            ...merchantConversion.get(value.id).values(),
        ].filter((c) => c.to.name != "gold");
        this.goodsSell = [...merchantConversion.get(value.id).values()].filter(
            (c) => c.to.name == "gold"
        );
    }
    hero$ = this.store.select(heroSelector);
    currencies$ = this.store.select(currenciesSelector);
    goodsBougth: CurrencyConversion[];
    goodsSell: CurrencyConversion[];
    public d: Map<string, boolean> = new Map<string, boolean>([
        ["b", false],
        ["s", false],
    ]);
    doConvert$: Subject<Conversion> = new Subject<Conversion>();
    private _convertSubscription = this.doConvert$
        .pipe(
            withLatestFrom(
                this.currencies$,
                this.hero$,
                (event: Conversion, currencies, hero) => {
                    const currency = currencies.find(
                        (c) => c.name === event.conversion.from.name
                    );
                    if (currency?.quantity >= event.conversion.from.quantity) {
                        //check qty
                        let qty = event.qty;
                        if (event.qty == -1) {
                            qty = Math.floor(
                                currency.quantity /
                                    event.conversion.from.quantity
                            );
                        }
                        if (event.qty == 0) return;
                        const convertFrom: Currency = {
                            ...event.conversion.from,
                            quantity: event.conversion.from.quantity * qty,
                        };
                        const convertTo: Currency = {
                            ...event.conversion.to,
                            quantity: event.conversion.to.quantity * qty,
                        };
                        this.store.dispatch(
                            new GameStateCurrenciesAddCurrencyAction(convertTo)
                        );
                        this.store.dispatch(
                            new GameStateCurrenciesAddCurrencyAction({
                                ...convertFrom,
                                quantity: -convertFrom.quantity,
                            })
                        );
                        this.store.dispatch(
                            new GameStateUpdateHeroAction(
                                levelUpFromAction(
                                    hero,
                                    "convert",
                                    qty,
                                    this._notifier,
                                    this.store
                                )
                            )
                        );
                        this._notifier.notify(
                            "text",
                            "reward.exp",
                            `${getXPForAction(hero.level, "convert", qty)}`,
                            1000
                        ); //reward
                        this._notifier.notify(
                            "1icon",
                            "convert",
                            "",
                            1000,
                            null,
                            [convertFrom, convertTo]
                        );
                    } else {
                        this._notifier.notify("1icon", "need", "", 3000, null, [
                            event.conversion.from,
                            event.conversion.to,
                        ]);
                    }
                }
            )
        )
        .subscribe();

    isVisible(s: string) {
        return this.d.get(s);
    }
    setIsVisible(s: string) {
        this.d.set(s, !this.isVisible(s));
    }

    trackByBougth(index: number, el: CurrencyConversion) {
        return el;
    }
    trackBySell(index: number, el: CurrencyConversion) {
        return el;
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
