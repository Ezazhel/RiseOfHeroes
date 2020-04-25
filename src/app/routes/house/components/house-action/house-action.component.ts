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
import { map, first } from "rxjs/operators";
import { _runtimeChecksFactory } from "@ngrx/store/src/runtime_checks";
import { trainingEquipement } from "../../store/house.selector";

@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public dTab: string = "training";
    idlingTimer: number; //Timer general allowing only one training.

    private _hero$: Subject<Hero> = new BehaviorSubject<Hero>(null);
    hero$: Observable<Hero> = this._hero$;
    @Input("hero") set _hero(value: Hero) {
        this._hero$.next(value);
    }

    private _currencies$: Subject<Map<string, Currency>> = new BehaviorSubject<
        Map<string, Currency>
    >(null);
    currencies$: Observable<Map<string, Currency>> = this._currencies$;
    @Input("currencies") set _currencies(value: Map<string, Currency>) {
        this._currencies$.next(value);
    }

    @Input() _trainingEquipment: Map<TrainingType, TrainingEquipment>;

    public _showTravel$: Observable<boolean> = this._currencies$.pipe(
        map((currencies: Map<string, Currency>) => {
            if (currencies.get("gold").quantity >= 50) {
                return true;
            }
        })
    );

    public TEqpmt = (type: TrainingType) => this._trainingEquipment.get(type);
    public displayStat(hero: Hero, stat: TrainingType) {
        switch (stat) {
            case "strength":
                return hero.attack;
            case "endurance":
                return hero.defense;
        }
    }
    public training: Map<TrainingType, boolean>;

    train(hero: Hero, stat: TrainingType) {
        let _trainEquipment = this._trainingEquipment.get(stat);
        if (
            this.training.get(stat) ||
            _trainEquipment.done === _trainEquipment.bonus
        ) {
            return;
        }
        clearTimeout(this.idlingTimer);
        this.training = this.training.map((value, key) => false);
        this.idling(hero, stat, _trainEquipment);
    }

    work(): void {
        clearTimeout(this.idlingTimer);
        this.training = this.training.map((value, key) => false);
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: 1,
            })
        );
    }

    private idling(
        hero: Hero,
        stat: TrainingType,
        trainingObject: TrainingEquipment
    ) {
        let trainEquipment = trainingObject;
        this.training = this.training.update(stat, () => true);

        this.idlingTimer = window.setTimeout(() => {
            switch (stat) {
                case "strength":
                    hero = {
                        ...hero,
                        attack: hero.attack + trainEquipment.reward,
                    };
                    break;
                case "endurance":
                    hero = {
                        ...hero,
                        defense: hero.defense + trainEquipment.reward,
                    };
                    break;
            }
            console.log(trainEquipment.done);

            this.store.dispatch(new GameStateUpdateHeroAction(hero));
            this.store.dispatch(new HouseUpdateTrainingEquipmentDone(stat));
            if (trainEquipment.done >= trainEquipment.bonus - 1) {
                this.training = this.training.update(stat, () => false);
                return;
            }
            this.idling(hero, stat, {
                ...trainEquipment,
                done: trainEquipment.done + 1,
            });
            console.log("Filling");
        }, trainEquipment.speed);
        setTimeout(() => {
            this.training = this.training.update(stat, () => false);
        }, trainEquipment.speed - 1);
    }

    public trackByFn(
        index: number,
        el: Map<TrainingType, TrainingEquipment>
    ): TrainingType {
        return el[index];
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.training = this._trainingEquipment?.map((value, key) => false);
    }

    ngOnDestroy(): void {
        clearTimeout(this.idlingTimer);
    }
}
