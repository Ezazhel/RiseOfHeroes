import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    TrainingEquipment,
    TrainingType,
    IdlingHouse,
    Work,
} from "@routes/house/store/house.model";
import { Hero } from "@core/models/entity";
import { getMultiplier, update, getHeroMaxHp } from "@core/models/utils";
import { take, withLatestFrom } from "rxjs/operators";
import { AddPassivesToStat } from "@core/models/spells/spells.utils";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { NotifierService } from "@core/services/notifier.service";
import { GameStateCurrenciesAddCurrencyAction } from "@core/models/game-state/game-state.action";
import { HouseTraining, HouseWorking } from "@routes/house/store/house.action";
import { Subscription, Subject, Observable } from "rxjs";
import { heroSelector, currencySelector } from "@core/models/selector";
import { works } from "@routes/house/store/house.selector";
import { Currency } from "@core/models/game-data/game-data.model";

@Component({
    selector: "work",
    templateUrl: "./Work.component.html",
    styleUrls: ["../house-action.component.scss"],
})
export class WorkComponent implements OnInit, OnDestroy {
    idlingTimer: number; //Timer general allowing only one training or working.

    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    public _work$: Observable<Work[]> = this.store.select(works);
    public _gold$: Observable<Currency> = this.store.select(
        currencySelector("gold")
    );
    public doWorking$: Subject<Work> = new Subject<Work>();

    private _workingSubscription: Subscription = this.doWorking$
        .pipe(
            withLatestFrom(this._hero$, (event: Work, hero: Hero) => {
                setTimeout(() => {
                    this.store.dispatch(new HouseWorking(event.id));
                }, 10);
                let time = getMultiplier("swiftness", hero, event.speed);
                clearTimeout(this.idlingTimer); //if training was set
                this.idlingTimer = window.setTimeout(() => {
                    this.store.dispatch(
                        new GameStateCurrenciesAddCurrencyAction(event.currency)
                    );
                    this._notifier.notify(
                        "",
                        `currency ${event.currency.name}`,
                        "reward",
                        event.currency.quantity,
                        1000
                    );
                    this.store.dispatch(new HouseWorking("none"));
                    this.doWorking$.next({
                        ...event,
                        done: event.done + 1,
                    });
                }, time);
            })
        )
        .subscribe();
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

    //#region Private

    private heroAfterTraining(
        hero: Hero,
        trainEquipment: TrainingEquipment,
        stat: TrainingType
    ) {
        let baseStats = update(
            hero.baseStats,
            (s) => s.type === stat,
            (s) => ({ ...s, value: s.value + trainEquipment.reward })
        );
        let stats = update(
            baseStats,
            (s) => s.type === stat,
            (s) => ({
                ...s,
                value: AddPassivesToStat(s.value, s.type, hero),
            })
        );
        let maxHp = getHeroMaxHp(
            stats.find((s) => s.type == "endurance").value
        );
        return {
            ...hero,
            baseStats,
            stats,
            maxHp,
            hp: maxHp,
        };
    }
    //#endregion Private

    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        clearTimeout(this.idlingTimer);
        this._workingSubscription.unsubscribe();
        this.store.dispatch(new HouseWorking("none"));
    }
}
