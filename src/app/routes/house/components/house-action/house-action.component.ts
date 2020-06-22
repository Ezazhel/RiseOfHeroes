import { update, getHeroMaxHp, getMultiplier } from "@core/models/utils";
import {
    HouseUpdateTrainingEquipmentDone,
    HouseTraining,
} from "./../../store/house.action";
import {
    TrainingEquipment,
    TrainingType,
    Work,
    IdlingHouse,
} from "./../../store/house.model";
import {
    GameStateUpdateHeroAction,
    GameStateCurrenciesAddCurrencyAction,
} from "@core/models/game-state/game-state.action";
import { Hero } from "@core/models/entity";
import { Store, select } from "@ngrx/store";
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    ChangeDetectionStrategy,
} from "@angular/core";
import { AppState } from "@core/models";
import { Observable, Subject, BehaviorSubject, Subscription } from "rxjs";
import { Currency } from "@core/models/game-data/game-data.model";
import { withLatestFrom, take } from "rxjs/operators";
import { _runtimeChecksFactory } from "@ngrx/store/src/runtime_checks";
import { AddPassivesToStat } from "@core/models/spells/spells.utils";
import { NotifierService } from "@core/services/notifier.service";
import { currencySelector, heroSelector } from "@core/models/selector";
@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public dTab: string = "training";
    idlingTimer: number; //Timer general allowing only one training or working.

    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    gold$: Observable<Currency> = this.store.select(currencySelector("gold"));

    @Input("trainings") _trainingEquipment$: Observable<TrainingEquipment>;
    @Input("work") _work: Work;

    public doTraining$: Subject<TrainingEquipment> = new Subject<
        TrainingEquipment
    >();
    public doWorking$: Subject<Work> = new Subject<Work>();

    private _trainingSubscription: Subscription = this.doTraining$
        .pipe(
            withLatestFrom(
                this._hero$,
                (event: TrainingEquipment, hero: Hero) => {
                    let time = getMultiplier("swiftness", hero, event.speed);
                    if (event.done <= event.bonus - 1) {
                        this.store.dispatch(new HouseTraining("none")); // reset every fillbar
                        window.setTimeout(
                            () =>
                                this.store.dispatch(
                                    new HouseTraining(event.id)
                                ),
                            10
                        );
                        clearTimeout(this.idlingTimer);
                        this.idlingTimer = window.setTimeout(() => {
                            hero = this.heroAfterTraining(
                                hero,
                                event,
                                event.id
                            );
                            this.store.dispatch(
                                new GameStateUpdateHeroAction(hero)
                            );
                            this.store.dispatch(
                                new HouseUpdateTrainingEquipmentDone(event.id)
                            );
                            this._notifier.notify(
                                `${event.reward} ${event.id}`,
                                "",
                                "reward"
                            );
                            this.doTraining$.next({
                                ...event,
                                done: event.done + 1,
                            });
                        }, time);
                    } else {
                        this._notifier.notify("No more training", "", "text");
                    }
                }
            )
        )
        .subscribe();

    private _workingSubscription: Subscription = this.doWorking$
        .pipe(
            withLatestFrom(this._hero$, (event: Work, hero: Hero) => {
                setTimeout(() => {
                    this._work = { ...this._work, isActive: true };
                }, 10);
                let time = getMultiplier("swiftness", hero, event.speed);
                this.store.dispatch(new HouseTraining("none")); // reset fillbar
                clearTimeout(this.idlingTimer); //if training was set
                this.idlingTimer = window.setTimeout(() => {
                    this.store.dispatch(
                        new GameStateCurrenciesAddCurrencyAction({
                            name: "gold",
                            quantity: this._work.reward,
                        })
                    );
                    this._notifier.notify(
                        "",
                        "currency gold",
                        "reward",
                        this._work.reward,
                        1000
                    );
                    this._work = { ...this._work, isActive: false };
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

    public displayStat(hero: Hero, stat: TrainingType) {
        return hero.baseStats.find((s) => s.type == stat).value;
    }

    public trackByFn(index: number, el: TrainingEquipment) {
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
        this._trainingSubscription.unsubscribe();
    }
}
