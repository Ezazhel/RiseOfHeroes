import { Injectable } from "@angular/core";
import { AppState } from "@core/models";
import { Observable, interval } from "rxjs";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class GameStateService {
    static STATE_KEY: string = "myGame";

    hasSaveGame(): boolean {
        return !!localStorage.getItem(GameStateService.STATE_KEY);
    }

    load(): Observable<AppState> {
        return interval(10).pipe(
            take(1),
            map(() => {
                const data = JSON.parse(
                    localStorage.getItem(GameStateService.STATE_KEY)
                ) as AppState;
                return data;
            })
        );
    }

    save(): Observable<AppState> {
        return this.store.pipe(
            take(1),
            map((state: AppState) => {
                const jsonData: string = JSON.stringify(state);
                localStorage.setItem(GameStateService.STATE_KEY, jsonData);
                return state;
            })
        );
    }
    constructor(private store: Store<AppState>) {}
}
