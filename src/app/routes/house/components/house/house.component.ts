import { HouseUpdateTrainingEquipmentBonus } from "./../../store/house.action";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { trainingEquipement } from "../../store/house.selector";
import { Observable, Subscription } from "rxjs";
import { TrainingEquipment } from "../../store/house.model";
import { currenciesSelector, heroSelector } from "@core/models/selector";
import { Currency } from "@core/models/game-data/game-data.model";
import { Hero } from "@core/models/entity";
import { take } from "rxjs/operators";

@Component({
    selector: "app-house",
    templateUrl: "./house.component.html",
    styleUrls: ["./house.component.scss"],
})
export class HouseComponent implements OnInit, OnDestroy {
    private heroSubscription: Subscription;
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));
    public _currencies$: Observable<Array<Currency>> = this.store.pipe(
        select(currenciesSelector)
    );

    public _trainingEquipment$: Observable<Array<TrainingEquipment>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.heroSubscription = this._hero$
            .pipe(take(1))
            .subscribe((hero: Hero) =>
                this.store.dispatch(
                    new HouseUpdateTrainingEquipmentBonus(hero.level)
                )
            );
        this._trainingEquipment$ = this.store.pipe(select(trainingEquipement));
    }
    ngOnDestroy(): void {
        this.heroSubscription.unsubscribe();
    }
}
