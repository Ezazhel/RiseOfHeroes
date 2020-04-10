import { HouseUpdateTrainingEquipmentDone } from "./../../store/house.action";
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

@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public dTab: string = "training";
    public idleState: string = "initial";
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

    private _isIdling: boolean = false;
    train(hero: Hero, stat: TrainingType) {
        if (this._isIdling) return;
        this._isIdling = true;
        clearTimeout(this.idlingTimer);
        this.idling(hero, stat);
    }

    work(): void {
        clearTimeout(this.idlingTimer);
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: 1,
            })
        );
    }

    private idling(hero: Hero, idle: TrainingType) {
        let trainingObject = this._trainingEquipment.get(idle);
        console.log("First get", trainingObject.done);
        this.idlingTimer = window.setTimeout(() => {
            switch (idle) {
                case "strength":
                    hero = {
                        ...hero,
                        attack: hero.attack + trainingObject.reward,
                    };
                    break;
                case "endurance":
                    hero = {
                        ...hero,
                        defense: hero.defense + trainingObject.reward,
                    };
                    break;
            }
            this.store.dispatch(new GameStateUpdateHeroAction(hero));
            this.store.dispatch(new HouseUpdateTrainingEquipmentDone(idle));
            trainingObject = this._trainingEquipment.get(idle);
            console.log("Second get", this._trainingEquipment.get(idle));

            if (trainingObject.done === trainingObject.bonus) return;
            this.train(hero, idle);
        }, trainingObject.speed);
        this.idleState = "filling";
        setTimeout(() => {
            this.idleState = "initial";
            this._isIdling = false;
        }, trainingObject.speed - 1);
    }

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        clearTimeout(this.idlingTimer);
    }
}
