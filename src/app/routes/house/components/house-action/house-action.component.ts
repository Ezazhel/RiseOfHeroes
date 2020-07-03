import { Component, OnInit, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { heroSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { first } from "rxjs/operators";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";
import { levelUpFromAction } from "@core/models/level";
import { NotifierService } from "@core/services/notifier.service";
@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public timer: number;
    setTimer(timer: number) {
        this.clearTimer();
        this.timer = timer;
    }
    clearTimer() {
        clearTimeout(this.timer);
    }
    cheat() {
        this.store
            .pipe(select(heroSelector))
            .pipe(first())
            .subscribe((h) => {
                this.store.dispatch(
                    new GameStateUpdateHeroAction(
                        levelUpFromAction(
                            h,
                            "cheat",
                            this._notifier,
                            this.store
                        )
                    )
                );
            });
    }
    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
