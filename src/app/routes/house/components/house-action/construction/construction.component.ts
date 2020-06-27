import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Hero } from "@core/models/entity";
import { select, Store } from "@ngrx/store";
import { heroSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { Construction } from "@routes/house/store/house.model";
import { constructions } from "@routes/house/store/house.selector";
import { Currency } from "@core/models/game-data/game-data.model";
import { withLatestFrom } from "rxjs/operators";
import { NotifierService } from "@core/services/notifier.service";
import { constructionEffects } from "@routes/house/store/house.data";
@Component({
    selector: "construction",
    templateUrl: "./construction.component.html",
    styleUrls: ["../house-action.component.scss"],
})
export class ConstructionComponent implements OnInit, OnDestroy {
    public _hero$: Observable<Hero> = this.store.select(heroSelector);
    public _constructions$: Observable<Construction[]> = this.store.select(
        constructions
    );

    _doBuild$: Subject<Construction> = new Subject();
    private _buildSubscription = this._doBuild$
        .pipe(
            withLatestFrom(this._hero$, (event: Construction, hero: Hero) => {
                if (!event.built) {
                    constructionEffects.get(event.id)(
                        this.store,
                        this._notifier
                    );
                }
            })
        )
        .subscribe();

    trackByFn(index: number, el: Construction) {
        return index;
    }
    trackByCost(index: number, el: Currency) {
        return index;
    }
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}
    ngOnInit() {}
    ngOnDestroy() {
        this._buildSubscription.unsubscribe();
    }
}
