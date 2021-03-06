import {
    Component,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output,
} from "@angular/core";
import {
    TrainingEquipment,
    TrainingType,
    IdlingHouse,
} from "@routes/house/store/house.model";
import { Hero } from "@core/models/entity/entity";
import { update } from "@core/models/utils";
import {
    getMultiplier,
    getHeroMaxHp,
    AddBuffToStat,
} from "@core/models/entity/entity.utils";

import { take, withLatestFrom } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { NotifierService } from "@core/services/notifier.service";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";
import {
    HouseUpdateTrainingEquipmentDone,
    HouseTraining,
} from "@routes/house/store/house.action";
import { Subscription, Subject, Observable } from "rxjs";
import { heroSelector } from "@core/models/selector";
import { trainingEquipement } from "@routes/house/store/house.selector";
import { levelUpFromAction, getXPForAction } from "@core/models/level";

@Component({
    selector: "training",
    templateUrl: "./training.component.html",
    styleUrls: ["../house-action.component.scss"],
})
export class TrainingComponent implements OnInit, OnDestroy {
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    _trainingEquipment$: Observable<TrainingEquipment[]> = this.store.select(
        trainingEquipement
    );
    @Output() doTraining: EventEmitter<void> = new EventEmitter<void>();
    @Output() setTimer: EventEmitter<number> = new EventEmitter<number>();
    public doTraining$: Subject<TrainingEquipment> = new Subject<
        TrainingEquipment
    >();

    private _trainingSubscription: Subscription = this.doTraining$
        .pipe(
            withLatestFrom(
                this._hero$,
                (event: TrainingEquipment, hero: Hero) => {
                    this.doTraining.emit();
                    let time = getMultiplier("swiftness", hero, event.speed);
                    if (event.done <= event.bonus - 1) {
                        this.store.dispatch(
                            new HouseTraining({
                                ...event,
                                id: "none",
                                type: "none",
                            })
                        ); // reset every fillbar
                        window.setTimeout(
                            () => this.store.dispatch(new HouseTraining(event)),
                            10
                        );
                        this.setTimer.emit(
                            window.setTimeout(() => {
                                hero = this.heroAfterTraining(
                                    hero,
                                    event,
                                    event.type
                                );
                                this.store.dispatch(
                                    new GameStateUpdateHeroAction(hero)
                                );
                                this.store.dispatch(
                                    new HouseUpdateTrainingEquipmentDone(event)
                                );
                                this._notifier.notify(
                                    "text",
                                    "reward.earn",
                                    `${event.reward} ${event.id}`,
                                    1000
                                ); //reward
                                this.store.dispatch(
                                    new GameStateUpdateHeroAction(
                                        levelUpFromAction(
                                            hero,
                                            "train",
                                            1,
                                            this._notifier,
                                            this.store
                                        )
                                    )
                                );
                                this._notifier.notify(
                                    "text",
                                    "reward.exp",
                                    `${getXPForAction(hero.level, "train")}`,
                                    1000
                                ); //reward
                                this.doTraining$.next({
                                    ...event,
                                    done: event.done + 1,
                                });
                            }, time)
                        );
                    } else {
                        this._notifier.notify(
                            "text",
                            "text",
                            "house.training.noMore"
                        ); //text no more training
                    }
                }
            )
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
                value: AddBuffToStat(s.value, s.type, hero),
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
        this._trainingSubscription.unsubscribe();
    }
}
