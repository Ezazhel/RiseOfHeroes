import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    TrainingEquipment,
    TrainingType,
    IdlingHouse,
} from "@routes/house/store/house.model";
import { Hero } from "@core/models/entity/entity";
import { update } from "@core/models/utils";
import { getMultiplier, getHeroMaxHp } from "@core/models/entity/entity.utils";

import { take, withLatestFrom } from "rxjs/operators";
import { AddBuffToStat } from "@core/models/spells/spells.utils";
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

@Component({
    selector: "training",
    templateUrl: "./training.component.html",
    styleUrls: ["../house-action.component.scss"],
})
export class TrainingComponent implements OnInit, OnDestroy {
    idlingTimer: number; //Timer general allowing only one training or working.

    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    _trainingEquipment$: Observable<TrainingEquipment[]> = this.store.select(
        trainingEquipement
    );

    public doTraining$: Subject<TrainingEquipment> = new Subject<
        TrainingEquipment
    >();

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
        clearTimeout(this.idlingTimer);
        this._trainingSubscription.unsubscribe();
        this.store.dispatch(new HouseTraining("none")); // reset every fillbar
    }
}
