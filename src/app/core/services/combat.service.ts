import { Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { CombatEncounter } from "@core/models/combat/combat.model";
import { Observable, of } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

import { AppState } from "@core/models";
import { Entity } from "@core/models/base-entity";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    constructor(private store: Store<AppState>) {}

    loadEncounter(): Observable<CombatEncounter> {
        let encounter: CombatEncounter = {
            type: "none",
            monster: null,
            hero: null,
        };
        return of(encounter);
    }
}
