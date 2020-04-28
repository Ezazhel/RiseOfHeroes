import { HouseUpdateTrainingEquipmentBonus } from "./../../store/house.action";
import { MessageService } from "@core/services/message.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { GameService } from "@core/services";
import { TranslocoService } from "@ngneat/transloco";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { trainingEquipement } from "../../store/house.selector";
import { Observable, Subscription } from "rxjs";
import { TrainingType, TrainingEquipment } from "../../store/house.model";
import { currencySelector, heroSelector } from "@core/models/selector";
import { Currency } from "@core/models/game-data/game-data.model";
import { Hero } from "@core/models/entity";
import { Map } from "immutable";
import { take, tap, first } from "rxjs/operators";

@Component({
    selector: "app-house",
    templateUrl: "./house.component.html",
    styleUrls: ["./house.component.scss"],
})
export class HouseComponent implements OnInit, OnDestroy {
    private heroSubscription: Subscription;
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));
    public _currencies$: Observable<Map<string, Currency>> = this.store.pipe(
        select(currencySelector)
    );

    public _trainingEquipment$: Observable<
        Map<TrainingType, TrainingEquipment>
    >;

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
