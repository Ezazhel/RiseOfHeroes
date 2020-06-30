import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import {
    Building,
    City,
    BuildingAction,
} from "@routes/world/city/store/cities.model";
import { Router } from "@angular/router";
import { descriptionFor } from "@core/models/actions";
import { AppState } from "@core/models";
import { Store, select } from "@ngrx/store";
import {
    TrainingEquipment,
    IdlingHouse,
    TrainingType,
} from "@routes/house/store/house.model";
import { Hero } from "@core/models/entity/entity";
import { heroSelector } from "@core/models/selector";
import { take, withLatestFrom } from "rxjs/operators";
import {
    getMultiplier,
    heroAfterTraining,
} from "@core/models/entity/entity.utils";
import { trainerTrainings } from "@routes/world/city/store/city.data";
import {
    HouseTraining,
    HouseAddTrainingEquipment,
} from "@routes/house/store/house.action";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";
import { NotifierService } from "@core/services/notifier.service";
import { CityBuildingTrainHero } from "@routes/world/city/store/cities.action";
import { update } from "@core/models/utils";
@Component({
    selector: "gym",
    templateUrl: "./gym.component.html",
    styleUrls: ["./gym.component.scss"],
})
export class GymComponent implements OnInit, OnDestroy {
    idlingTimer: number;
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    @Input() building: Building;
    @Input() city: City;

    _trainings: TrainingEquipment[];

    getDone(id: string) {
        const t = this.building.trainings.find((t) => t.id === id);
        return t !== undefined ? t.done : undefined;
    }
    descriptionFor(a: BuildingAction) {
        return descriptionFor(a);
    }

    public doTraining$: Subject<{
        training: TrainingEquipment;
        done: number;
    }> = new Subject<{ training: TrainingEquipment; done: number }>();

    private _trainingSubscription: Subscription = this.doTraining$
        .pipe(
            withLatestFrom(
                this._hero$,
                (
                    event: { training: TrainingEquipment; done: number },
                    hero: Hero
                ) => {
                    let time = getMultiplier(
                        "swiftness",
                        hero,
                        event.training.speed
                    );
                    if (event.done <= event.training.bonus - 1) {
                        this._trainings = update(
                            this._trainings,
                            (t) => t.type === event.training.type,
                            (t) => ({ ...t, isActive: false })
                        );
                        window.setTimeout(
                            () =>
                                (this._trainings = update(
                                    this._trainings,
                                    (t) => t.type === event.training.type,
                                    (t) => ({ ...t, isActive: true })
                                )),
                            10
                        );
                        clearTimeout(this.idlingTimer);
                        this.idlingTimer = window.setTimeout(() => {
                            hero = heroAfterTraining(
                                hero,
                                event.training,
                                event.training.type
                            );
                            this.store.dispatch(
                                new GameStateUpdateHeroAction(hero)
                            );
                            this.store.dispatch(
                                new CityBuildingTrainHero({
                                    city: this.city.id,
                                    building: {
                                        ...this.building,
                                        trainings: update(
                                            this.building.trainings,
                                            (t) => t.id === event.training.id,
                                            (t) => ({ ...t, done: t.done + 1 })
                                        ),
                                    },
                                })
                            );
                            this._notifier.notify(
                                `${event.training.reward} ${event.training.type}`,
                                "",
                                "reward"
                            );
                            this.doTraining$.next({
                                ...event,
                                done: event.done + 1,
                            });
                            this._trainings = update(
                                this._trainings,
                                (t) => t.type === event.training.type,
                                (t) => ({ ...t, done: t.done + 1 })
                            );
                        }, time);
                    } else {
                        this._notifier.notify("No more training", "", "text");
                        this.store.dispatch(
                            new CityBuildingTrainHero({
                                city: this.city.id,
                                building: {
                                    ...this.building,
                                    trainings: this.building.trainings.filter(
                                        (t) => t.id != event.training.id
                                    ),
                                },
                            }) //remove training
                        );
                        this.store.dispatch(
                            new HouseAddTrainingEquipment({
                                ...event.training,
                                done: event.done,
                            })
                        );
                        this._trainings = this._trainings.filter(
                            (t) => t.type !== event.training.type
                        );
                    }
                }
            )
        )
        .subscribe();

    public displayStat(hero: Hero, stat: TrainingType) {
        return hero.baseStats.find((s) => s.type == stat).value;
    }

    public getTime(idling: IdlingHouse) {
        let time: number = idling.speed;
        this._hero$.pipe(take(1)).subscribe((h) => {
            time = getMultiplier("swiftness", h, idling.speed);
        });
        return time;
    }

    trackByFn(index: number, el: TrainingEquipment) {
        return index;
    }
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {
        this._trainings = [...trainerTrainings.get(this.city.id).values()].map(
            (t) => ({
                ...t,
                done: this.getDone(t.id),
            })
        );
    }

    ngOnDestroy(): void {
        this._trainingSubscription.unsubscribe();
    }
}
