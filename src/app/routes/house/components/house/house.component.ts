import { HouseUpdateTrainingEquipmentBonus } from "./../../store/house.action";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { Observable, Subscription } from "rxjs";
import { heroSelector } from "@core/models/selector";

import { Hero } from "@core/models/entity";

@Component({
    selector: "app-house",
    templateUrl: "./house.component.html",
    styleUrls: ["./house.component.scss"],
})
export class HouseComponent implements OnInit, OnDestroy {
    private heroSubscription: Subscription;
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.heroSubscription = this._hero$.subscribe((hero: Hero) =>
            this.store.dispatch(
                new HouseUpdateTrainingEquipmentBonus(hero.level)
            )
        );
    }
    ngOnDestroy(): void {
        this.heroSubscription.unsubscribe();
    }
}
