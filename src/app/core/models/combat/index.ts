import * as combatReducer from "./combat.reducer";
import { ActionReducerMap } from "@ngrx/store";
export interface CombatState {
    combat: combatReducer.CombatRecord;
}

export const reducers: ActionReducerMap<CombatState> = {
    combat: combatReducer.combatReducer,
};
