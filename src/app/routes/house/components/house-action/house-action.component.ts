import { update, getHeroMaxHp } from "@core/models/utils";
import {
    HouseUpdateTrainingEquipmentDone,
    HouseTraining,
} from "./../../store/house.action";
import { TrainingEquipment, TrainingType } from "./../../store/house.model";
import {
    GameStateUpdateHeroAction,
    GameStateCurrenciesAddCurrencyAction,
} from "@core/models/game-state/game-state.action";
import { Hero } from "@core/models/entity";
import { Store, select } from "@ngrx/store";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AppState } from "@core/models";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Currency } from "@core/models/game-data/game-data.model";
import { Map } from "immutable";
import { map } from "rxjs/operators";
import { _runtimeChecksFactory } from "@ngrx/store/src/runtime_checks";
import { MessageService } from "@core/services";
import { AddPassivesToStat } from "@core/models/spells/spells.utils";
@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public dTab: string = "training";
    idlingTimer: number; //Timer general allowing only one training or working.
    timeOutFilling: number;

    private _hero$: Subject<Hero> = new BehaviorSubject<Hero>(null);
    hero$: Observable<Hero> = this._hero$;
    @Input("hero") set _hero(value: Hero) {
        this._hero$.next(value);
    }

    private _currencies$: Subject<Array<Currency>> = new BehaviorSubject<
        Array<Currency>
    >(null);
    currencies$: Observable<Array<Currency>> = this._currencies$;
    @Input("currencies") set _currencies(value: Array<Currency>) {
        this._currencies$.next(value);
    }

    gold$: Observable<Currency> = this._currencies$.pipe(
        map((currencies: Array<Currency>) =>
            currencies.find((c) => c.name == "gold")
        )
    );

    @Input() _trainingEquipment: Array<TrainingEquipment>;

    public TEqpmt = (type: TrainingType) =>
        this._trainingEquipment.find((equipment) => equipment.id == type);

    public displayStat(hero: Hero, stat: TrainingType) {
        switch (stat) {
            case "strength":
                return hero.baseStats.find((s) => s.type == "strength").value;
            case "endurance":
                return hero.baseStats.find((s) => s.type == "endurance").value;
        }
    }

    train(hero: Hero, stat: TrainingType) {
        let training = this._trainingEquipment.find(
            (equipment) => equipment.id == stat
        );
        if (training.isTraining || training.done === training.bonus) {
            return;
        }
        clearTimeout(this.idlingTimer);
        clearTimeout(this.timeOutFilling);

        // this.training = this.training.map((value, key) => false);
        this.store.dispatch(new HouseTraining(stat));
        this.idling(hero, stat, training);
    }
    private idling(
        hero: Hero,
        stat: TrainingType,
        trainingObject: TrainingEquipment
    ) {
        let trainEquipment = trainingObject;
        // this.training = this.training.update(stat, () => true);

        this.idlingTimer = window.setTimeout(() => {
            hero = this.heroAfterTraining(hero, trainEquipment, stat);
            this.store.dispatch(new GameStateUpdateHeroAction(hero));
            this.store.dispatch(new HouseUpdateTrainingEquipmentDone(stat));
            this.store.dispatch(new HouseTraining(stat));
            if (trainEquipment.done >= trainEquipment.bonus - 1) {
                this.store.dispatch(new HouseTraining(stat));
                return;
            }
            this.idling(hero, stat, {
                ...trainEquipment,
                done: trainEquipment.done + 1,
            });
        }, trainEquipment.speed);
        this.timeOutFilling = window.setTimeout(() => {
            this.store.dispatch(new HouseTraining(stat));
        }, trainEquipment.speed - 1);
    }

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

    public work = {
        working: false,
        time: 1000,
        reward: 1,
    };

    goToWork(): void {
        clearTimeout(this.idlingTimer);
        clearTimeout(this.timeOutFilling);
        this.store.dispatch(new HouseTraining("none"));
        this.working();
    }
    private working() {
        this.work = { ...this.work, working: true };

        this.idlingTimer = window.setTimeout(() => {
            this.store.dispatch(
                new GameStateCurrenciesAddCurrencyAction({
                    name: "gold",
                    quantity: this.work.reward,
                })
            );
            this.working();
        }, this.work.time);
        setTimeout(
            () => (this.work = { ...this.work, working: false }),
            this.work.time - 1
        );
    }

    public trackByFn(index: number, el: TrainingEquipment) {
        return index;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        clearTimeout(this.idlingTimer);
    }
}
