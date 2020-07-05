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
    public d: Map<string, boolean> = new Map<string, boolean>([
        ["training", false],
        ["work", false],
        ["construction", false],
    ]);

    isVisible(s: string) {
        return this.d.get(s);
    }
    setIsVisible(s: string) {
        this.d.set(s, !this.isVisible(s));
    }
    setTimer(timer: number) {
        this.clearTimer();
        this.timer = timer;
    }
    clearTimer() {
        clearTimeout(this.timer);
    }

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
