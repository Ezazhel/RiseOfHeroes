import { moveItemInArray } from "@angular/cdk/drag-drop";
import { Action, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "@core/models";
import { MessageService } from "@core/services";
import { Effect, ofType, Actions } from "@ngrx/effects";
import * as CombatAction from "@core/models/combat/combat.action";
import { CombatService } from "@core/services/combat.service";
import { CombatEncounter } from "./combat.model";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable()
export class CombatEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private messageservice: MessageService,
        private combatService: CombatService
    ) {}

    @Effect() beginCombat$: Observable<Action> = this.action$.pipe(
        ofType(CombatAction.COMBAT_ENCOUNTER),
        switchMap(() => {
            return this.combatService.loadEncounter();
        }),
        map((encounter: CombatEncounter) => {
            return new CombatAction.CombatEncounterReadyAction(encounter);
        })
    );
}
