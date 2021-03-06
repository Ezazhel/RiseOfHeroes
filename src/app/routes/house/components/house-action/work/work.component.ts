import {
    Component,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output,
} from "@angular/core";
import { IdlingHouse, Work } from "@routes/house/store/house.model";
import { Hero } from "@core/models/entity/entity";
import { getMultiplier } from "@core/models/entity/entity.utils";

import { take, withLatestFrom } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { NotifierService } from "@core/services/notifier.service";
import {
    GameStateCurrenciesAddCurrencyAction,
    GameStateUpdateHeroAction,
} from "@core/models/game-state/game-state.action";
import { HouseWorking, HousePromotion } from "@routes/house/store/house.action";
import { Subscription, Subject, Observable } from "rxjs";
import { heroSelector, currencySelector } from "@core/models/selector";
import { works } from "@routes/house/store/house.selector";
import { Currency } from "@core/models/game-data/game-data.model";
import { CurrencyType } from "@core/models/game-data/game-data.data";
import { levelUpFromAction, getXPForAction } from "@core/models/level";

@Component({
    selector: "work",
    templateUrl: "./Work.component.html",
    styleUrls: ["../house-action.component.scss"],
})
export class WorkComponent implements OnInit, OnDestroy {
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    public _work$: Observable<Work[]> = this.store.select(works);

    @Output() public doWorking: EventEmitter<void> = new EventEmitter<void>();
    @Output() setTimer: EventEmitter<number> = new EventEmitter<number>();
    public doWorking$: Subject<Work> = new Subject<Work>();

    private _workingSubscription: Subscription = this.doWorking$
        .pipe(
            withLatestFrom(this._hero$, (event: Work, hero: Hero) => {
                this.doWorking.emit();
                this.store.dispatch(new HouseWorking(null));

                setTimeout(() => this.store.dispatch(new HouseWorking(event)));
                let time = getMultiplier("swiftness", hero, event.speed);
                const buffMult = hero.buffsStats.find((b) => b.type === "loot");
                const reward = {
                    ...event,
                    currency:
                        buffMult !== undefined
                            ? {
                                  ...event.currency,
                                  quantity:
                                      buffMult !== undefined
                                          ? event.currency.quantity *
                                            buffMult.mult
                                          : event.currency.quantity,
                              }
                            : event.currency,
                };
                this.setTimer.emit(
                    window.setTimeout(() => {
                        this.store.dispatch(
                            new GameStateCurrenciesAddCurrencyAction(
                                reward.currency
                            )
                        );
                        this._notifier.notify(
                            "1icon",
                            "reward.earn",
                            "",
                            time - 100,
                            null,
                            [reward.currency]
                        ); //reward -currencyqty
                        this.store.dispatch(
                            new GameStateUpdateHeroAction(
                                levelUpFromAction(
                                    hero,
                                    "work",
                                    1,
                                    this._notifier,
                                    this.store
                                )
                            )
                        );
                        this._notifier.notify(
                            "text",
                            "reward.exp",
                            `${getXPForAction(hero.level, "work")}`,
                            time - 100
                        ); //reward
                        event = { ...event, done: event.done + 1 };
                        event = event.upgrade(
                            this.store,
                            this._notifier,
                            event
                        );
                        this.doWorking$.next(event);
                    }, time)
                );
            })
        )
        .subscribe();

    public getCurrency(type: CurrencyType): Observable<Currency> {
        return this.store.select(currencySelector(type));
    }
    public getTime(idling: IdlingHouse) {
        let time: number = idling.speed;
        this._hero$.pipe(take(1)).subscribe((h) => {
            time = getMultiplier("swiftness", h, idling.speed);
        });
        return time;
    }

    public trackByFn(index: number, el: Work) {
        return index;
    }

    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._workingSubscription.unsubscribe();
    }
}
